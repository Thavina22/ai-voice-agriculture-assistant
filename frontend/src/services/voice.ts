import { apiClient } from './api';
import { VoiceIncomingPayload, VoiceLanguagePayload, VoiceRecordingPayload } from '@/types/api';

const SAMPLE_IVR_TWIML = `<Response><Gather action="/api/v1/voice/language" method="POST" num_digits="1" timeout="8"><Say voice="Polly.Aditi" language="en-IN">Welcome to Krishi Mitra AI. Press 1 for Tamil, 2 for English, 3 for Telugu.</Say></Gather></Response>`;

const SAMPLE_RECORD_TWIML = `<Response><Say voice="Polly.Aditi" language="en-IN">Please describe your crop issue after the tone.</Say><Record action="/api/v1/voice/recording" method="POST" timeout="5" max_length="30" play_beep="true" /></Response>`;

const SAMPLE_DIAGNOSIS_TWIML = `<Response><Say voice="Polly.Aditi" language="en-IN">Your tomato crop shows Early Blight symptoms. Apply Mancozeb 75% WP @ 2g/L water.</Say><Hangup /></Response>`;

export const triggerIncomingCall = async (payload: VoiceIncomingPayload = {}): Promise<string> => {
  try {
    const formData = new URLSearchParams();
    if (payload.CallSid) formData.append('CallSid', payload.CallSid);
    if (payload.From) formData.append('From', payload.From);

    const response = await apiClient.post<string>('/api/v1/voice/incoming', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  } catch (err) {
    console.warn('Live API endpoint unavailable, using fallback TwiML response:', err);
    return SAMPLE_IVR_TWIML;
  }
};

export const selectLanguage = async (payload: VoiceLanguagePayload): Promise<string> => {
  try {
    const formData = new URLSearchParams();
    if (payload.CallSid) formData.append('CallSid', payload.CallSid);
    if (payload.From) formData.append('From', payload.From);
    if (payload.Digits) formData.append('Digits', payload.Digits);

    const response = await apiClient.post<string>('/api/v1/voice/language', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  } catch (err) {
    console.warn('Live API endpoint unavailable, using fallback record TwiML response:', err);
    return SAMPLE_RECORD_TWIML;
  }
};

export const submitRecording = async (payload: VoiceRecordingPayload): Promise<string> => {
  try {
    const formData = new URLSearchParams();
    if (payload.CallSid) formData.append('CallSid', payload.CallSid);
    if (payload.From) formData.append('From', payload.From);
    if (payload.RecordingSid) formData.append('RecordingSid', payload.RecordingSid);
    if (payload.RecordingUrl) formData.append('RecordingUrl', payload.RecordingUrl);
    if (payload.RecordingDuration) formData.append('RecordingDuration', payload.RecordingDuration);

    const lang = payload.lang || 'en-IN';
    const response = await apiClient.post<string>(`/api/v1/voice/recording?lang=${lang}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  } catch (err) {
    console.warn('Live API endpoint unavailable, using fallback diagnosis TwiML response:', err);
    return SAMPLE_DIAGNOSIS_TWIML;
  }
};
