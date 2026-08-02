from fastapi import APIRouter, Response, Request
from typing import Optional

from app.services.twilio_service import TwilioService, LANGUAGES
from app.services.call_session_service import CallSessionService
from app.services.speech_service import SpeechService
from app.services.agri_ai_service import AgriAIService
from app.utils.logger import log_call_summary

router = APIRouter(tags=["Twilio Voice Webhook"])


# ===============================
# Incoming Call
# ===============================

@router.api_route("/api/v1/voice/incoming", methods=["GET", "POST"], response_class=Response)
@router.api_route("/voice/incoming", methods=["GET", "POST"], response_class=Response)
@router.api_route("/voice", methods=["GET", "POST"], response_class=Response)
async def incoming_voice_call(request: Request):
    """Initial call handler. Initializes session and presents IVR language menu."""
    try:
        form_data = {}
        if request.method == "POST":
            try:
                form_data = await request.form()
            except Exception:
                pass

        sid = form_data.get("CallSid") or request.query_params.get("CallSid") or "anonymous_call"
        caller = form_data.get("From") or request.query_params.get("From") or "Unknown"

        CallSessionService.get_or_create_session(
            call_sid=str(sid),
            caller_number=str(caller)
        )

        twiml_xml = TwilioService.build_ivr_menu_twiml()
        return Response(content=twiml_xml, media_type="application/xml")

    except Exception as err:
        print("[Voice Webhook Error]: Incoming call handler failed -", err)
        return Response(content=TwilioService.build_apology_twiml("en-IN"), media_type="application/xml")


# ===============================
# Language Selection
# ===============================

@router.api_route("/api/v1/voice/language", methods=["GET", "POST"], response_class=Response)
@router.api_route("/voice/language", methods=["GET", "POST"], response_class=Response)
async def process_language_selection(request: Request):
    """Processes farmer language selection digit and returns <Record> prompt TwiML."""
    try:
        form_data = {}
        if request.method == "POST":
            try:
                form_data = await request.form()
            except Exception:
                pass

        sid = form_data.get("CallSid") or request.query_params.get("CallSid") or "anonymous_call"
        digit = form_data.get("Digits") or form_data.get("digits") or request.query_params.get("digits") or request.query_params.get("Digits") or ""
        digit = str(digit).strip()

        lang_info = LANGUAGES.get(digit)
        if not lang_info:
            lang_info = next((v for v in LANGUAGES.values() if v["code"] == digit), None)

        if not lang_info:
            return Response(
                content=TwilioService.build_recording_prompt_twiml("1"),
                media_type="application/xml"
            )

        session = CallSessionService.update_language(
            call_sid=str(sid),
            language_name=lang_info["name"],
            language_code=lang_info["code"]
        )

        twiml_xml = TwilioService.build_recording_prompt_twiml(digit)
        return Response(content=twiml_xml, media_type="application/xml")

    except Exception as err:
        print("[Voice Webhook Error]: Language selection failed -", err)
        return Response(content=TwilioService.build_apology_twiml("en-IN"), media_type="application/xml")


# ===============================
# Recording Callback
# ===============================

@router.api_route("/api/v1/voice/recording", methods=["GET", "POST"], response_class=Response)
@router.api_route("/voice/recording", methods=["GET", "POST"], response_class=Response)
@router.api_route("/api/v1/voice/record", methods=["GET", "POST"], response_class=Response)
@router.api_route("/voice/record", methods=["GET", "POST"], response_class=Response)
async def handle_voice_recording(request: Request):
    """POST/GET callback triggered by Twilio after farmer completes speech recording."""
    try:
        form_data = {}
        if request.method == "POST":
            try:
                form_data = await request.form()
            except Exception:
                pass

        sid = form_data.get("CallSid") or request.query_params.get("CallSid") or "anonymous_call"
        rec_sid = form_data.get("RecordingSid") or request.query_params.get("recording_sid") or request.query_params.get("RecordingSid") or "N/A"
        rec_url = form_data.get("RecordingUrl") or request.query_params.get("recording_url") or request.query_params.get("RecordingUrl") or "N/A"
        duration_str = form_data.get("RecordingDuration") or request.query_params.get("recording_duration") or "0"
        duration = int(duration_str) if str(duration_str).isdigit() else 0
        lang = request.query_params.get("lang") or "en-IN"

        session = CallSessionService.update_recording(str(sid), str(rec_sid), str(rec_url), duration)
        transcript = SpeechService.transcribe_audio(str(rec_url), session.language_code)
        session = CallSessionService.update_transcript(str(sid), transcript)

        ai_recommendation = AgriAIService.analyze_crop_issue(transcript, session.language_code)

        log_call_summary(session)

        twiml_xml = TwilioService.build_ai_response_twiml(ai_recommendation, lang_code=session.language_code)
        return Response(content=twiml_xml, media_type="application/xml")

    except Exception as err:
        print(f"[Voice Webhook Error]: Recording callback failed -", err)
        return Response(content=TwilioService.build_apology_twiml("en-IN"), media_type="application/xml")