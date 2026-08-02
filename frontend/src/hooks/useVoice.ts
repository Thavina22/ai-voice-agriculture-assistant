import { useState, useCallback } from 'react';
import { triggerIncomingCall, selectLanguage, submitRecording } from '@/services/voice';
import { VoiceIncomingPayload, VoiceLanguagePayload, VoiceRecordingPayload } from '@/types/api';

export const useVoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTwiML, setLastTwiML] = useState<string | null>(null);

  const startCall = useCallback(async (payload: VoiceIncomingPayload = {}) => {
    setLoading(true);
    setError(null);
    try {
      const twiml = await triggerIncomingCall(payload);
      setLastTwiML(twiml);
      return twiml;
    } catch (err: any) {
      const msg = err.message || 'Incoming call simulation failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const chooseLanguage = useCallback(async (payload: VoiceLanguagePayload) => {
    setLoading(true);
    setError(null);
    try {
      const twiml = await selectLanguage(payload);
      setLastTwiML(twiml);
      return twiml;
    } catch (err: any) {
      const msg = err.message || 'Language selection failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadRecording = useCallback(async (payload: VoiceRecordingPayload) => {
    setLoading(true);
    setError(null);
    try {
      const twiml = await submitRecording(payload);
      setLastTwiML(twiml);
      return twiml;
    } catch (err: any) {
      const msg = err.message || 'Recording upload failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    lastTwiML,
    startCall,
    chooseLanguage,
    uploadRecording,
  };
};
