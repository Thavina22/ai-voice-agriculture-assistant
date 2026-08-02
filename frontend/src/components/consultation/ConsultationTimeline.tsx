import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Phone, Languages, Mic, Brain, Sparkles } from 'lucide-react';


interface ConsultationTimelineProps {
  step: 'idle' | 'incoming' | 'language' | 'recording' | 'completed';
  selectedLangName?: string;
  transcript?: string;
}

export const ConsultationTimeline: React.FC<ConsultationTimelineProps> = ({
  step,
  selectedLangName = 'English',
  transcript,
}) => {
  const steps = [
    {
      id: 'incoming',
      title: '1. Incoming Telephony Webhook',
      desc: 'POST /api/v1/voice/incoming triggered by Twilio Voice gateway.',
      icon: Phone,
      active: step !== 'idle',
      completed: step === 'language' || step === 'recording' || step === 'completed',
    },
    {
      id: 'language',
      title: '2. IVR Language Selection',
      desc: `Farmer selected ${selectedLangName} DTMF input.`,
      icon: Languages,
      active: step === 'language' || step === 'recording' || step === 'completed',
      completed: step === 'recording' || step === 'completed',
    },
    {
      id: 'recording',
      title: '3. Audio Recording & Webhook Callback',
      desc: 'Twilio <Record> verb captured speech audio stream.',
      icon: Mic,
      active: step === 'recording' || step === 'completed',
      completed: step === 'completed',
    },
    {
      id: 'stt',
      title: '4. Speech-to-Text & RCA Rule Match',
      desc: transcript ? `Transcribed: "${transcript}"` : 'Awaiting STT engine conversion...',
      icon: Brain,
      active: step === 'completed',
      completed: step === 'completed',
    },
    {
      id: 'ai',
      title: '5. AI Recommendation & TTS Spoken Response',
      desc: 'Groq Llama-3 recommendation synthesized for farmer playback.',
      icon: Sparkles,
      active: step === 'completed',
      completed: step === 'completed',
    },
  ];

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Diagnostic Telemetry Trace</h3>
          <p className="text-xs text-gray-400">Step-by-step pipeline execution timeline</p>
        </div>
        <Badge variant={step === 'completed' ? 'success' : 'info'}>
          {step === 'completed' ? 'Telemetry Complete' : 'Telemetry Active'}
        </Badge>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="relative flex items-start space-x-3 text-xs">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all z-10 ${
                  s.completed
                    ? 'bg-agri-600 border-agri-600 text-white'
                    : s.active
                    ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400'
                }`}
              >
                {s.completed ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
              </div>

              <div className="flex-1 bg-gray-50 dark:bg-dark-bg p-3 rounded-2xl border border-gray-100 dark:border-dark-border">
                <h4 className="font-bold text-gray-900 dark:text-white">{s.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
