from twilio.twiml.voice_response import VoiceResponse, Gather

LANGUAGES = {
    "1": {
        "name": "Tamil",
        "code": "ta-IN",
        "voice": "Polly.Valluvar",
        "prompt": "இது ஒரு மாதிரி அழைப்பாகும். பீப் ஒலிக்குப் பிறகு உங்கள் பயிர் பிரச்சனையை விவரிக்கவும்.",
        "received": "உங்கள் பதிவு பெறப்பட்டது. பகுப்பாய்வு செய்யப்படுகிறது.",
        "closing": "இது ஒரு மாதிரி அழைப்பாகும். எதிர்கால மேம்பாடுகள் விரைவில் வழங்கப்படும். நன்றி."
    },
    "2": {
        "name": "English",
        "code": "en-IN",
        "voice": "Polly.Aditi",
        "prompt": "This is a demonstration call. Please describe your crop issue after the tone.",
        "received": "Thank you. Your recording has been received and is being analyzed.",
        "closing": "Note: This completes your demonstration call. Future upgrades will be available soon. Thank you for calling Krishi Mitra AI."
    },
    "3": {
        "name": "Telugu",
        "code": "te-IN",
        "voice": "Polly.Aditi",
        "prompt": "ఇది ఒక నమూనా కాల్ మాత్రమే. బీప్ తర్వాత మీ పంట సమస్యను వివరించండి.",
        "received": "మీ రికార్డింగ్ స్వీకరించబడింది. విశ్లేషించబడుతోంది.",
        "closing": "గమనిక: ఇది ఒక నమూనా కాల్ మాత్రమే. భవిష్యత్ నవీకరణలు త్వరలో రాబోతున్నాయి. ధన్యవాదాలు."
    }
}


class TwilioService:
    """
    Twilio TwiML generator for Demo Voice Calls:
    - IVR Demo Greeting & Language Selection
    - Voice Recording Prompt
    - AI Voice Response with Demo Disclaimer Closing
    """

    @staticmethod
    def build_ivr_menu_twiml(
        action_url: str = "/api/v1/voice/language"
    ) -> str:
        response = VoiceResponse()

        gather = Gather(
            action=action_url,
            method="POST",
            num_digits=1,
            timeout=8
        )

        # Explicit Demo Announcement
        gather.say(
            "Welcome to Krishi Mitra AI Agriculture Assistant. "
            "This is a demonstration call for our AI Voice Platform. "
            "Future upgrades and live officer support will be enabled soon.",
            voice="Polly.Aditi",
            language="en-IN"
        )

        gather.say(
            "தமிழுக்கு 1 அழுத்தவும். Press 1 for Tamil.",
            voice="Polly.Aditi",
            language="en-IN"
        )

        gather.say(
            "Press 2 for English.",
            voice="Polly.Aditi",
            language="en-IN"
        )

        gather.say(
            "తెలుగు కోసం 3 నొక్కండి. Press 3 for Telugu.",
            voice="Polly.Aditi",
            language="en-IN"
        )

        response.append(gather)

        response.say(
            "We did not receive your selection. Please call back.",
            voice="Polly.Aditi",
            language="en-IN"
        )

        response.redirect(
            "/api/v1/voice/incoming",
            method="POST"
        )

        return str(response)

    @staticmethod
    def build_recording_prompt_twiml(
        digits: str
    ) -> str:
        response = VoiceResponse()
        digits_str = str(digits).strip() if digits is not None else ""
        lang_info = LANGUAGES.get(digits_str)
        if not lang_info:
            lang_info = next((v for v in LANGUAGES.values() if v["code"] == digits_str), None)

        if not lang_info:
            lang_info = LANGUAGES["2"]

        response.say(
            lang_info["prompt"],
            voice=lang_info["voice"],
            language=lang_info["code"]
        )

        record_action = (
            f"/api/v1/voice/recording?lang={lang_info['code']}"
        )

        response.record(
            action=record_action,
            method="POST",
            timeout=5,
            max_length=30,
            play_beep=True,
            trim="trim-silence"
        )

        return str(response)

    @staticmethod
    def build_recording_received_twiml(
        lang_code: str = "en-IN"
    ) -> str:
        response = VoiceResponse()
        lang_config = next(
            (v for v in LANGUAGES.values() if v["code"] == lang_code),
            LANGUAGES["2"]
        )

        response.say(
            lang_config["received"],
            voice=lang_config["voice"],
            language=lang_config["code"]
        )

        return str(response)

    @staticmethod
    def build_ai_response_twiml(
        message: str,
        lang_code: str = "en-IN"
    ) -> str:
        """
        Generate TwiML response for AI agriculture advice.
        Appends demo disclaimer and hangs up gracefully.
        """
        response = VoiceResponse()

        lang_config = next(
            (v for v in LANGUAGES.values() if v["code"] == lang_code),
            LANGUAGES["2"]
        )

        full_message = f"{message} {lang_config['closing']}"

        response.say(
            full_message,
            voice=lang_config["voice"],
            language=lang_config["code"]
        )

        response.hangup()
        return str(response)

    @staticmethod
    def build_apology_twiml(
        lang_code: str = "en-IN"
    ) -> str:
        """
        Generate TwiML apology response for demo call error.
        """
        response = VoiceResponse()

        apologies = {
            "ta-IN": "மன்னிக்கவும். இது ஒரு மாதிரி அழைப்பாகும். எதிர்கால மேம்பாடுகள் விரைவில் வழங்கப்படும்.",
            "en-IN": "We apologize. This is a demonstration call. Future upgrades will be available soon.",
            "te-IN": "క్షమించండి. ఇది ఒక నమూనా కాల్ మాత్రమే. భవిష్యత్ నవీకరణలు త్వరలో రాబోతున్నాయి."
        }

        lang_config = next(
            (v for v in LANGUAGES.values() if v["code"] == lang_code),
            LANGUAGES["2"]
        )

        text = apologies.get(lang_code, apologies["en-IN"])
        response.say(
            text,
            voice=lang_config["voice"],
            language=lang_config["code"]
        )
        response.hangup()

        return str(response)