from typing import Optional
from datetime import datetime, timezone

from pydantic import BaseModel, Field

from app.utils.constants import CallStage


class CallSession(BaseModel):
    """
    Stores one Twilio call session.
    """

    # -------------------------
    # Call Details
    # -------------------------

    call_sid: str
    caller_number: str = "Unknown"

    # -------------------------
    # Language
    # -------------------------

    selected_language: str = "English"
    language_code: str = "en-IN"

    # IMPORTANT:
    # Keep this as str because CallStage is
    # not a Pydantic Enum in your project.

    current_stage: str = CallStage.WELCOME

    # -------------------------
    # Recording
    # -------------------------

    recording_sid: Optional[str] = None
    recording_url: Optional[str] = None
    recording_duration: Optional[int] = None

    # -------------------------
    # Speech Recognition
    # -------------------------

    transcript: Optional[str] = None

    # -------------------------
    # Agriculture Diagnosis
    # -------------------------

    detected_crop: Optional[str] = None
    detected_disease: Optional[str] = None
    confidence_score: Optional[float] = None

    # -------------------------
    # AI Response
    # -------------------------

    ai_response: Optional[str] = None

    # -------------------------
    # Timestamp
    # -------------------------

    timestamp: str = Field(
        default_factory=lambda: datetime.now(
            timezone.utc
        ).strftime("%Y-%m-%d %H:%M:%S")
    )