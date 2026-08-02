import { apiClient } from './api';
import { VoiceIncomingPayload, VoiceLanguagePayload, VoiceRecordingPayload } from '@/types/api';

export const triggerIncomingCall = async (payload: VoiceIncomingPayload = {}): Promise<string> => {
  const formData = new URLSearchParams();
  if (payload.CallSid) formData.append('CallSid', payload.CallSid);
  if (payload.From) formData.append('From', payload.From);

  const response = await apiClient.post<string>('/api/v1/voice/incoming', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data;
};

export const selectLanguage = async (payload: VoiceLanguagePayload): Promise<string> => {
  const formData = new URLSearchParams();
  if (payload.CallSid) formData.append('CallSid', payload.CallSid);
  if (payload.From) formData.append('From', payload.From);
  if (payload.Digits) formData.append('Digits', payload.Digits);

  const response = await apiClient.post<string>('/api/v1/voice/language', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data;
};

export const submitRecording = async (payload: VoiceRecordingPayload): Promise<string> => {
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
};
