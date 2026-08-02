import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mic, Square, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecordingPlayerProps {
  loading: boolean;
  selectedLangName: string;
  onFinishRecording: (duration: number) => void;
}

export const RecordingPlayer: React.FC<RecordingPlayerProps> = ({
  loading,
  selectedLangName,
  onFinishRecording,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="space-y-4 border-rose-500/30">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 rounded-xl">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Twilio Audio Recording Active</h3>
              <p className="text-xs text-gray-400">Recording speech in {selectedLangName}</p>
            </div>
          </div>
          <Badge variant="danger">Recording ({seconds}s / 30s)</Badge>
        </div>

        {/* Animated Sound Waveforms */}
        <div className="flex items-center justify-center space-x-1.5 py-6 bg-gray-50 dark:bg-dark-bg rounded-2xl">
          {[40, 70, 30, 90, 50, 80, 40, 100, 60, 30, 85, 45, 95, 60, 30].map((height, idx) => (
            <motion.div
              key={idx}
              animate={{ height: [`${height * 0.3}%`, `${height}%`, `${height * 0.3}%`] }}
              transition={{ repeat: Infinity, duration: 0.8 + (idx % 5) * 0.2 }}
              className="w-1.5 bg-gradient-to-t from-agri-600 to-emerald-400 rounded-full"
              style={{ height: `${height}%`, minHeight: '12px', maxHeight: '48px' }}
            />
          ))}
        </div>

        <button
          onClick={() => onFinishRecording(seconds || 15)}
          disabled={loading}
          className="w-full py-3 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transcribing Speech & Running RCA...</span>
            </>
          ) : (
            <>
              <Square className="w-4 h-4 fill-white" />
              <span>Finish Recording & Process Diagnosis</span>
            </>
          )}
        </button>
      </Card>
    </motion.div>
  );
};
