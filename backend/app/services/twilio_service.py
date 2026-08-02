from twilio.twiml.voice_response import VoiceResponse, Gather


LANGUAGES = {

    "1": {
        "name": "Tamil",
        "code": "ta-IN",
        "voice": "Polly.Valluvar",
        "prompt": "நீங்கள் தமிழை தேர்ந்தெடுத்துள்ளீர்கள். பீப் ஒலிக்குப் பிறகு உங்கள் பயிர் பிரச்சனையை விவரிக்கவும்.",
        "received": "உங்கள் பதிவு பெறப்பட்டது. பகுப்பாய்வு செய்யப்படுகிறது."
    },


    "2": {
        "name": "Telugu",
        "code": "te-IN",
        "voice": "Polly.Aditi",
        "prompt": "మీరు తెలుగును ఎంచుకున్నారు. బీప్ తర్వాత మీ పంట సమస్యను వివరించండి.",
        "received": "మీ రికార్డింగ్ స్వీకరించబడింది. విశ్లేషించబడుతోంది."
    },


    "3": {
        "name": "English",
        "code": "en-IN",
        "voice": "Polly.Aditi",
        "prompt": "You have selected English. Please describe your crop issue after the beep.",
        "received": "Your recording has been received and is being analyzed."
    }

}



class TwilioService:
    """
    Twilio Voice Service

    Handles:
    - IVR language selection
    - Voice recording
    - AI response playback
    """


    # -----------------------------------------
    # Initial IVR Menu
    # -----------------------------------------

    @staticmethod
    def build_ivr_menu_twiml(
        action_url="/api/v1/voice/language"
    ):

        response = VoiceResponse()


        gather = Gather(
            action=action_url,
            method="POST",
            num_digits=1,
            timeout=8
        )


        gather.say(
            "Welcome to AI Agriculture Assistant.",
            voice="Polly.Aditi",
            language="en-IN"
        )


        gather.say(
            "தமிழுக்கு 1 அழுத்தவும்.",
            voice="Polly.Aditi",
            language="en-IN"
        )


        gather.say(
            "తెలుగు కోసం 2 నొక్కండి.",
            voice="Polly.Aditi",
            language="en-IN"
        )


        gather.say(
            "Press 3 for English.",
            voice="Polly.Aditi",
            language="en-IN"
        )


        response.append(gather)


        response.say(
            "No selection received.",
            voice="Polly.Aditi",
            language="en-IN"
        )


        response.redirect(
            "/api/v1/voice/incoming",
            method="POST"
        )


        return str(response)



    # -----------------------------------------
    # Recording Prompt
    # -----------------------------------------

    @staticmethod
    def build_recording_prompt_twiml(
        language_input: str
    ):

        response = VoiceResponse()


        language_input = str(
            language_input
        ).strip()



        # Digit lookup
        lang_info = LANGUAGES.get(
            language_input
        )


        # Language code lookup
        if not lang_info:

            lang_info = next(
                (
                    value
                    for value in LANGUAGES.values()
                    if value["code"] == language_input
                ),
                None
            )



        if not lang_info:


            response.say(
                "Invalid language selection.",
                voice="Polly.Aditi",
                language="en-IN"
            )


            response.redirect(
                "/api/v1/voice/incoming",
                method="POST"
            )


            return str(response)




        # Speak selected language message

        response.say(
            lang_info["prompt"],
            voice=lang_info["voice"],
            language=lang_info["code"]
        )



        # Send language to callback

        record_url = (
            "/api/v1/voice/recording"
            f"?lang={lang_info['code']}"
        )



        response.record(

            action=record_url,

            method="POST",

            timeout=5,

            max_length=30,

            play_beep=True,

            trim="trim-silence"

        )



        return str(response)



    # -----------------------------------------
    # Recording Received
    # -----------------------------------------

    @staticmethod
    def build_recording_received_twiml(
        lang_code="en-IN"
    ):

        response = VoiceResponse()


        lang_info = next(

            (
                item
                for item in LANGUAGES.values()
                if item["code"] == lang_code
            ),

            LANGUAGES["3"]

        )


        response.say(

            lang_info["received"],

            voice=lang_info["voice"],

            language=lang_info["code"]

        )


        return str(response)




    # -----------------------------------------
    # AI Response
    # -----------------------------------------

    @staticmethod
    def build_ai_response_twiml(
        message: str,
        lang_code="en-IN"
    ):


        response = VoiceResponse()



        lang_info = next(

            (
                item
                for item in LANGUAGES.values()
                if item["code"] == lang_code
            ),

            LANGUAGES["3"]

        )



        response.say(

            message,

            voice=lang_info["voice"],

            language=lang_info["code"]

        )


        response.hangup()


        return str(response)




    # -----------------------------------------
    # Error Response
    # -----------------------------------------

    @staticmethod
    def build_apology_twiml(
        lang_code="en-IN"
    ):


        response = VoiceResponse()



        messages = {


            "ta-IN":
            "மன்னிக்கவும். தொழில்நுட்ப பிழை ஏற்பட்டது. பின்னர் முயற்சிக்கவும்.",


            "te-IN":
            "క్షమించండి. సాంకేతిక సమస్య ఏర్పడింది. తర్వాత ప్రయత్నించండి.",


            "en-IN":
            "Sorry. A technical problem occurred. Please try again later."

        }



        lang_info = next(

            (
                item
                for item in LANGUAGES.values()
                if item["code"] == lang_code
            ),

            LANGUAGES["3"]

        )



        response.say(

            messages.get(
                lang_code,
                messages["en-IN"]
            ),

            voice=lang_info["voice"],

            language=lang_info["code"]

        )



        response.hangup()


        return str(response)