# Architecture Decision Record (ADR) - AI Voice Agriculture Assistant

## Overview
This document logs key architectural and technical decisions made during the evolution of the AI Voice Agriculture Assistant system.

---

## Phase 1 & 2: System Setup & Telephony Gateway
- **FastAPI**: Selected for lightweight asynchronous execution, strict typing, high throughput, and native OpenAPI generation.
- **Twilio Voice Webhook Integration**: Implemented a decoupled TwiML XML response builder (`VoiceService` / `TwilioService`) to separate HTTP routing from telephony XML logic.

---

## Phase 3: Multi-Language IVR System
- **DTMF Keypress Capture**: Implemented Twilio `<Gather>` verb for capturing user touch-tone inputs.
- **Native Synthesis**: Used Polly voices (`Polly.Valluvar` for Tamil, `Polly.Aditi` for English/Telugu) to provide high-quality localized prompts.

---

## Phase 4: Voice Recording Module & Call Session Architecture

### Key Decisions & Rationale

#### 1. Introduction of Call Session Architecture (`CallSessionService`)
- **Problem**: Telephony webhooks from Twilio are stateless HTTP requests. Tracking a call's context across multiple webhooks (e.g. Incoming -> Language Selection -> Recording Callback -> STT -> Knowledge Engine) requires state retention.
- **Decision**: Introduced an in-memory `CallSession` domain model keyed by Twilio `CallSid`.
- **Future Scalability**: In future production phases, this in-memory session map can be seamlessly swapped for Redis or SQLite without changing business logic signatures.

#### 2. Grouping of REST Endpoints
- **Problem**: Disorganized webhook endpoints lead to maintenance overhead.
- **Decision**: Grouped all voice-related routes under `/api/v1/voice/*` (`/incoming`, `/language`, `/recording`).
- **Future Scalability**: Establishes a predictable RESTful interface for future phase endpoints (`/transcribe`, `/analyze`, `/respond`, `/end`).

#### 3. Isolation of Recording Webhook Callbacks
- **Problem**: Recording uploads from Twilio happen asynchronously after the caller stops speaking.
- **Decision**: Isolated recording webhook callback handling (`POST /api/v1/voice/recording`) into a dedicated endpoint.
- **Future Scalability**: Allows the backend to trigger asynchronous background workers (Celery/FastAPI BackgroundTasks) to process Speech-to-Text and Knowledge Engine analysis without blocking Twilio's HTTP response.

#### 4. `<Record>` Parameter Optimization
- `action`: Dedicated callback route `/api/v1/voice/recording?lang={code}`.
- `method="POST"`: Transmits form-encoded payload (`RecordingUrl`, `RecordingSid`, `RecordingDuration`).
- `timeout=5`: Automatically stops recording after 5 seconds of silence (optimized for elderly farmers).
- `max_length=30`: Limits audio duration to 30s to keep Speech-to-Text processing fast and cost-effective.
- `play_beep=True`: Clear auditory cue instructing the farmer to start speaking.
- `trim="trim-silence"`: Trims silent audio headers and footers from audio files.

---

## Phase 5: Speech-to-Text (STT) Module
- **Pluggable Speech Engine (`SpeechService`)**: Isolated speech recognition logic into `app/services/speech_service.py`. It accepts audio URLs (`RecordingUrl`) and language codes (`ta-IN`, `en-IN`, `te-IN`).
- **Language Awareness**: Performs transcription according to the farmer's IVR language selection.
- **Pipeline Stage Progression**: Advances `CallSession` stage from `RECORDING_COMPLETED` to `TRANSCRIBING` and attaches the generated text string to `CallSession.transcript`.
- **Decoupled Architecture**: Keeps STT execution completely separate from Twilio routing, making it easy to swap between Google Speech-to-Text, OpenAI Whisper, or Bhashini without modifying HTTP webhooks.

