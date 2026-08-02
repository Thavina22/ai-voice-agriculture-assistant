from fastapi import APIRouter, Response, Form
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
async def incoming_voice_call(
    CallSid: Optional[str] = Form(None),
    From: Optional[str] = Form(None)
):
    try:
        sid = CallSid or "anonymous_call"
        caller = From or "Unknown"

        print("Incoming Call:", sid)

        CallSessionService.get_or_create_session(
            call_sid=sid,
            caller_number=caller
        )

        twiml_xml = TwilioService.build_ivr_menu_twiml()

        return Response(
            content=twiml_xml,
            media_type="application/xml"
        )

    except Exception as err:
        print("Incoming call error:", err)

        return Response(
            content=TwilioService.build_apology_twiml("en-IN"),
            media_type="application/xml"
        )


# ===============================
# Language Selection
# ===============================

@router.post("/api/v1/voice/language", response_class=Response)
@router.post("/voice/language", response_class=Response)
async def process_language_selection(
    CallSid: Optional[str] = Form(None),
    From: Optional[str] = Form(None),
    Digits: Optional[str] = Form(None),
    digits: Optional[str] = Form(None)
):
    try:
        sid = CallSid or "anonymous_call"
        digit = (Digits or digits or "").strip()

        print("\n===== LANGUAGE MENU =====")
        print("Call SID:", sid)
        print("Pressed Digit:", digit)

        lang_info = LANGUAGES.get(digit)

        print("Selected Language:", lang_info)

        if not lang_info:
            print("Invalid language selection!")
            return Response(
                content=TwilioService.build_apology_twiml("en-IN"),
                media_type="application/xml"
            )

        session = CallSessionService.update_language(
            call_sid=sid,
            language_name=lang_info["name"],
            language_code=lang_info["code"]
        )

        print("Session Updated")
        print("Selected Language :", session.selected_language)
        print("Language Code     :", session.language_code)

        twiml_xml = TwilioService.build_recording_prompt_twiml(digit)

        return Response(
            content=twiml_xml,
            media_type="application/xml"
        )

    except Exception as err:
        print("Language selection error:", err)

        return Response(
            content=TwilioService.build_apology_twiml("en-IN"),
            media_type="application/xml"
        )


@router.get("/api/v1/voice/language", response_class=Response)
@router.get("/voice/language", response_class=Response)
async def process_language_selection_get(digits: Optional[str] = None):
    """GET fallback for testing language selection in browser query params."""
    twiml_xml = TwilioService.build_recording_prompt_twiml(digits or "1")
    return Response(content=twiml_xml, media_type="application/xml")


# ===============================
# Recording Callback
# ===============================

@router.post("/api/v1/voice/recording", response_class=Response)
@router.post("/voice/recording", response_class=Response)
@router.post("/api/v1/voice/record", response_class=Response)
@router.post("/voice/record", response_class=Response)
async def handle_voice_recording_post(
    lang: str = "en-IN",
    CallSid: Optional[str] = Form(None),
    RecordingSid: Optional[str] = Form(None),
    RecordingUrl: Optional[str] = Form(None),
    RecordingDuration: Optional[str] = Form(None)
):
    """POST callback triggered by Twilio after farmer completes speech recording."""
    sid = CallSid or "anonymous_call"
    try:
        rec_sid = RecordingSid or "N/A"
        rec_url = RecordingUrl or "N/A"
        duration = int(RecordingDuration) if RecordingDuration and RecordingDuration.isdigit() else 0

        session = CallSessionService.update_recording(sid, rec_sid, rec_url, duration)
        transcript = SpeechService.transcribe_audio(rec_url, session.language_code)
        session = CallSessionService.update_transcript(sid, transcript)

        ai_recommendation = AgriAIService.analyze_crop_issue(transcript, session.language_code)

        log_call_summary(session)

        twiml_xml = TwilioService.build_ai_response_twiml(ai_recommendation, lang_code=session.language_code)
        return Response(content=twiml_xml, media_type="application/xml")

    except Exception as err:
        print(f"[Voice Webhook Error]: Recording callback failed for CallSid={sid} - {err}")
        twiml_xml = TwilioService.build_apology_twiml(lang)
        return Response(content=twiml_xml, media_type="application/xml")


@router.get("/api/v1/voice/recording", response_class=Response)
@router.get("/voice/recording", response_class=Response)
@router.get("/api/v1/voice/record", response_class=Response)
@router.get("/voice/record", response_class=Response)
async def handle_voice_recording_get(
    lang: str = "en-IN",
    call_sid: str = "anonymous_call",
    recording_sid: str = "RE_SAMPLE_123",
    recording_url: str = "https://api.twilio.com/sample.wav",
    recording_duration: int = 15
):
    """GET fallback for testing transcription & Gemini AI recommendation in browser address bar."""
    try:
        session = CallSessionService.update_recording(call_sid, recording_sid, recording_url, recording_duration)
        transcript = SpeechService.transcribe_audio(recording_url, session.language_code)
        session = CallSessionService.update_transcript(call_sid, transcript)

        ai_recommendation = AgriAIService.analyze_crop_issue(transcript, session.language_code)
        log_call_summary(session)

        twiml_xml = TwilioService.build_ai_response_twiml(ai_recommendation, lang_code=session.language_code)
        return Response(content=twiml_xml, media_type="application/xml")
    except Exception as err:
        print(f"[Voice Webhook Error]: Recording GET handler failed - {err}")
        twiml_xml = TwilioService.build_apology_twiml(lang)
        return Response(content=twiml_xml, media_type="application/xml")