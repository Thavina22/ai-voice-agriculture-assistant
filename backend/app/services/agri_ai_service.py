import os
import httpx
from app.config import settings

# System prompt for Gemini AI Agricultural Reasoning Engine
SYSTEM_PROMPT = """
You are Krishi Mitra AI, an agriculture assistant helping Indian farmers.

Your job:
- Understand farmer crop problems.
- Provide simple practical farming advice.
- Do not invent diseases.
- Always identify: 1 Disease 2 Possible Cause 3 Immediate Action 4 Prevention.
- If uncertain, ask farmer for more details or suggest contacting agriculture officer.

Rules:
- Keep response short because it will be spoken over a phone call.
- Maximum 4 sentences.
"""

# Localized fallback responses if Gemini API is unavailable
FALLBACK_RESPONSES = {
    "en-IN": (
        "Your crop issue has been recorded. "
        "Remove infected leaves, avoid overhead watering, and consult your local agriculture officer."
    ),
    "ta-IN": (
        "உங்கள் பயிர் பிரச்சனை பதிவு செய்யப்பட்டுள்ளது. "
        "பாதிக்கப்பட்ட இலைகளை அகற்றி, மேலிருந்து தண்ணீர் பாய்ச்சுவதை தவிர்த்து, "
        "விவசாய அலுவலரின் ஆலோசனையை பெறவும்."
    ),
    "te-IN": (
        "మీ పంట సమస్య నమోదు చేయబడింది. "
        "దెబ్బతిన్న ఆకులను తొలగించి, పై నుండి నీరు పోయకుండా ఉండండి. "
        "సమీప వ్యవసాయ అధికారిని సంప్రదించండి."
    ),
}


class AgriAIService:
    """Agricultural AI Advisory service powered by Google Gemini API with localized fallback."""

    @staticmethod
    def analyze_crop_issue(transcript: str, language: str = "en-IN") -> str:
        """
        Analyze farmer transcript and generate concise localized recommendation using Gemini.
        """
        if not transcript or not transcript.strip():
            return AgriAIService._get_fallback_response(language)

        gemini_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")

        if not gemini_key or gemini_key.startswith("YOUR_"):
            return AgriAIService._get_fallback_response(language)

        try:
            return AgriAIService._call_gemini_api(transcript, language, gemini_key)
        except Exception as err:
            print(f"[AgriAI Error]: Gemini API call failed - {err}")
            return AgriAIService._get_fallback_response(language)

    @staticmethod
    def _call_gemini_api(transcript: str, language: str, api_key: str) -> str:
        """Make HTTP request to Google Gemini API."""
        model = getattr(settings, "GEMINI_MODEL", "gemini-1.5-flash")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

        prompt_text = (
            f"{SYSTEM_PROMPT}\n\n"
            f"Target Response Language: {language}\n"
            f"Farmer Spoken Query: \"{transcript}\"\n\n"
            f"Provide advice in {language} language."
        )

        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt_text}]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "maxOutputTokens": 300
            }
        }

        with httpx.Client(timeout=10.0) as client:
            response = client.post(url, json=payload)
            if response.status_code == 200:
                data = response.json()
                candidates = data.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts and "text" in parts[0]:
                        return parts[0]["text"].strip()

        return AgriAIService._get_fallback_response(language)

    @staticmethod
    def _get_fallback_response(language: str) -> str:
        """Return localized safe fallback advice."""
        return FALLBACK_RESPONSES.get(language, FALLBACK_RESPONSES["en-IN"])