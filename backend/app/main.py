from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from app.config import settings
from app.routes.health import router as health_router
from app.routes.voice import router as voice_router
from app.routes.dashboard import router as dashboard_router
from app.services.twilio_service import TwilioService, LANGUAGES
from app.services.call_session_service import CallSessionService
from app.services.speech_service import SpeechService
from app.services.agri_ai_service import AgriAIService
from app.utils.logger import log_call_summary


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.VERSION,
        description="Production-grade API for AI Voice Agriculture Assistant MVP",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def root():
        return {
            "status": "online",
            "message": "Welcome to AI Voice Agriculture Assistant API",
            "documentation": "/docs",
            "health_check": "/api/v1/health",
            "voice_webhook": "/api/v1/voice/incoming",
        }

    # Top-level fallback routes for maximum reliability
    @app.api_route("/voice/incoming", methods=["GET", "POST"], response_class=Response)
    @app.api_route("/api/v1/voice/incoming", methods=["GET", "POST"], response_class=Response)
    @app.api_route("/voice", methods=["GET", "POST"], response_class=Response)
    async def direct_incoming_call(request: Request):
        try:
            form_data = {}
            if request.method == "POST":
                try:
                    form_data = await request.form()
                except Exception:
                    pass

            sid = form_data.get("CallSid") or request.query_params.get("CallSid") or "anonymous_call"
            caller = form_data.get("From") or request.query_params.get("From") or "Unknown"

            CallSessionService.get_or_create_session(call_sid=str(sid), caller_number=str(caller))
            twiml_xml = TwilioService.build_ivr_menu_twiml()
            return Response(content=twiml_xml, media_type="application/xml")
        except Exception as err:
            print("[Voice Error]:", err)
            return Response(content=TwilioService.build_apology_twiml("en-IN"), media_type="application/xml")

    @app.api_route("/voice/language", methods=["GET", "POST"], response_class=Response)
    @app.api_route("/api/v1/voice/language", methods=["GET", "POST"], response_class=Response)
    async def direct_language_selection(request: Request):
        try:
            form_data = {}
            if request.method == "POST":
                try:
                    form_data = await request.form()
                except Exception:
                    pass

            sid = form_data.get("CallSid") or request.query_params.get("CallSid") or "anonymous_call"
            digit = form_data.get("Digits") or form_data.get("digits") or request.query_params.get("digits") or request.query_params.get("Digits") or "1"
            digit = str(digit).strip()

            lang_info = LANGUAGES.get(digit)
            if not lang_info:
                lang_info = next((v for v in LANGUAGES.values() if v["code"] == digit), None)

            if lang_info:
                CallSessionService.update_language(call_sid=str(sid), language_name=lang_info["name"], language_code=lang_info["code"])

            twiml_xml = TwilioService.build_recording_prompt_twiml(digit)
            return Response(content=twiml_xml, media_type="application/xml")
        except Exception as err:
            print("[Language Error]:", err)
            return Response(content=TwilioService.build_apology_twiml("en-IN"), media_type="application/xml")

    @app.api_route("/voice/recording", methods=["GET", "POST"], response_class=Response)
    @app.api_route("/api/v1/voice/recording", methods=["GET", "POST"], response_class=Response)
    @app.api_route("/voice/record", methods=["GET", "POST"], response_class=Response)
    @app.api_route("/api/v1/voice/record", methods=["GET", "POST"], response_class=Response)
    async def direct_recording_callback(request: Request):
        try:
            form_data = {}
            if request.method == "POST":
                try:
                    form_data = await request.form()
                except Exception:
                    pass

            sid = form_data.get("CallSid") or request.query_params.get("CallSid") or "anonymous_call"
            rec_sid = form_data.get("RecordingSid") or request.query_params.get("RecordingSid") or "RE_SAMPLE_123"
            rec_url = form_data.get("RecordingUrl") or request.query_params.get("RecordingUrl") or "https://api.twilio.com/sample.wav"
            duration_str = form_data.get("RecordingDuration") or request.query_params.get("RecordingDuration") or "15"
            duration = int(duration_str) if str(duration_str).isdigit() else 0

            session = CallSessionService.update_recording(str(sid), str(rec_sid), str(rec_url), duration)
            transcript = SpeechService.transcribe_audio(str(rec_url), session.language_code)
            session = CallSessionService.update_transcript(str(sid), transcript)

            ai_recommendation = AgriAIService.analyze_crop_issue(transcript, session.language_code)
            log_call_summary(session)

            twiml_xml = TwilioService.build_ai_response_twiml(ai_recommendation, lang_code=session.language_code)
            return Response(content=twiml_xml, media_type="application/xml")
        except Exception as err:
            print("[Recording Error]:", err)
            return Response(content=TwilioService.build_apology_twiml("en-IN"), media_type="application/xml")

    app.include_router(health_router)
    app.include_router(voice_router)
    app.include_router(dashboard_router)

    return app


app = create_app()