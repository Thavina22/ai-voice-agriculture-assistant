import React, { useState } from 'react';
import { useVoice } from '@/hooks/useVoice';
import { useToast } from '@/components/ui/Toast';
import { CallConsole } from '@/components/consultation/CallConsole';
import { LanguageSelector } from '@/components/consultation/LanguageSelector';
import { RecordingPlayer } from '@/components/consultation/RecordingPlayer';
import { DiagnosisResultCard } from '@/components/consultation/DiagnosisResultCard';
import { ConsultationTimeline } from '@/components/consultation/ConsultationTimeline';

type Step = 'idle' | 'incoming' | 'language' | 'recording' | 'completed';

export const VoiceConsultation: React.FC = () => {
  const [step, setStep] = useState<Step>('idle');
  const [callSid] = useState(() => `CA${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  const [selectedDigit, setSelectedDigit] = useState<string | null>(null);
  const [selectedLangName, setSelectedLangName] = useState<string>('English');
  const [selectedLangCode, setSelectedLangCode] = useState<string>('en-IN');
  const [transcript, setTranscript] = useState<string>('My tomato leaves have dark brown spots with yellow concentric rings.');

  const { loading, startCall, chooseLanguage, uploadRecording } = useVoice();
  const { showToast } = useToast();

  const handleStartCall = async () => {
    try {
      await startCall({ CallSid: callSid, From: '+919876543210' });
      setStep('incoming');
      showToast('info', 'Twilio Gateway Connected', 'IVR Language Menu presented');
    } catch (err: any) {
      showToast('error', 'Call Initiation Failed', err.message);
    }
  };

  const handleSelectLanguage = async (digit: string, langName: string, langCode: string) => {
    setSelectedDigit(digit);
    setSelectedLangName(langName);
    setSelectedLangCode(langCode);

    if (digit === '1') {
      setTranscript('என் தக்காளி இலையில் கருப்பு புள்ளிகள் மற்றும் மஞ்சள் நிற வளையங்கள் உள்ளன.');
    } else if (digit === '3') {
      setTranscript('నా టమోటా ఆకులపై నల్లటి మచ్చలు మరియు పసుపు రంగు వలయాలు ఉన్నాయి.');
    } else {
      setTranscript('My tomato leaves have dark brown spots with yellow concentric rings.');
    }

    try {
      await chooseLanguage({ CallSid: callSid, From: '+919876543210', Digits: digit });
      setStep('recording');
      showToast('success', `${langName} Selected`, 'Twilio <Record> prompt initiated');
    } catch (err: any) {
      showToast('error', 'Language Selection Failed', err.message);
    }
  };

  const handleFinishRecording = async (duration: number) => {
    try {
      const recordingSid = `RE${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const recordingUrl = `https://api.twilio.com/2010-04-01/Accounts/AC123/Recordings/${recordingSid}.wav`;

      await uploadRecording({
        lang: selectedLangCode,
        CallSid: callSid,
        From: '+919876543210',
        RecordingSid: recordingSid,
        RecordingUrl: recordingUrl,
        RecordingDuration: String(duration),
      });

      setStep('completed');
      showToast('success', 'Diagnosis Complete', 'STT & Knowledge Engine RCA finished');
    } catch (err: any) {
      showToast('error', 'Recording Upload Failed', err.message);
    }
  };

  const handleEndCall = () => {
    setStep('idle');
    setSelectedDigit(null);
    showToast('info', 'Call Ended', 'Session reset to idle');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Voice Consultation Studio</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Interactive telephony console communicating with live FastAPI endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Call Console */}
        <div className="space-y-6 lg:col-span-1">
          <CallConsole
            step={step}
            loading={loading}
            onStartCall={handleStartCall}
            onEndCall={handleEndCall}
          />

          <ConsultationTimeline
            step={step}
            selectedLangName={selectedLangName}
            transcript={step === 'completed' ? transcript : undefined}
          />
        </div>

        {/* Right Column: Dynamic Steps */}
        <div className="space-y-6 lg:col-span-2">
          {step === 'incoming' && (
            <LanguageSelector
              loading={loading}
              selectedDigit={selectedDigit}
              onSelectLanguage={handleSelectLanguage}
            />
          )}

          {step === 'recording' && (
            <RecordingPlayer
              loading={loading}
              selectedLangName={selectedLangName}
              onFinishRecording={handleFinishRecording}
            />
          )}

          {step === 'completed' && (
            <DiagnosisResultCard
              transcript={transcript}
              languageName={selectedLangName}
            />
          )}
        </div>
      </div>
    </div>
  );
};
