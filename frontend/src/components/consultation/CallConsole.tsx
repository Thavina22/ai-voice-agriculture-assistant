import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PhoneCall, PhoneOff, Mic, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CallConsoleProps {
  step: 'idle' | 'incoming' | 'language' | 'recording' | 'completed';
  loading: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
}

export const CallConsole: React.FC<CallConsoleProps> = ({
  step,
  loading,
  onStartCall,
  onEndCall,
}) => {
  const isCallActive = step !== 'idle' && step !== 'completed';

  return (
    <Card className="flex flex-col items-center justify-center text-center p-8 space-y-6 border-agri-500/20">
      <div className="relative">
        <motion.div
          animate={isCallActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
            isCallActive
              ? 'bg-agri-600 text-white shadow-2xl shadow-agri-600/50'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
          }`}
        >
          {loading ? (
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          ) : (
            <Mic className="w-12 h-12" />
          )}
        </motion.div>

        {isCallActive && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <Badge variant={isCallActive ? 'success' : 'neutral'}>
            {step === 'idle' && 'Ready for Call'}
            {step === 'incoming' && 'IVR Menu Active'}
            {step === 'language' && 'Language Selected'}
            {step === 'recording' && 'Recording Farmer Speech'}
            {step === 'completed' && 'Diagnosis Complete'}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {isCallActive ? 'Active Call (+1 800 555-FARM)' : 'AI Voice Agriculture Telephony'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {step === 'idle' && 'Click below to initiate incoming voice call simulation.'}
          {step === 'incoming' && 'Twilio IVR presenting language selection.'}
          {step === 'language' && 'Prompting farmer to describe crop symptoms after beep.'}
          {step === 'recording' && 'Capturing audio stream from farmer microphone.'}
          {step === 'completed' && 'Session saved. Diagnostic results generated below.'}
        </p>
      </div>

      <div className="w-full">
        {isCallActive ? (
          <button
            onClick={onEndCall}
            className="w-full py-3 rounded-2xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Consultation Call</span>
          </button>
        ) : (
          <button
            onClick={onStartCall}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl font-bold text-sm bg-agri-600 hover:bg-agri-700 disabled:opacity-50 text-white shadow-lg shadow-agri-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Twilio Gateway...</span>
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4" />
                <Sparkles className="w-4 h-4" />
                <span>Start Voice Consultation</span>
              </>
            )}
          </button>
        )}
      </div>
    </Card>
  );
};
