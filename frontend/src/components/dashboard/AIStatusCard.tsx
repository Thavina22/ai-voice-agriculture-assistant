import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Brain, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { AIStatusData } from '@/types/api';

interface AIStatusCardProps {
  data: AIStatusData | null;
  loading: boolean;
}

export const AIStatusCard: React.FC<AIStatusCardProps> = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <Card className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 rounded-xl">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI & RCA Engine Health</h3>
            <p className="text-xs text-gray-400">System Telemetry & Latency</p>
          </div>
        </div>
        <Badge variant="success">{data.status}</Badge>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-agri-600" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Knowledge Engine (RCA)</span>
          </div>
          <span className="font-bold text-emerald-600">{data.rca_engine_latency}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Groq AI (Llama 3 70B)</span>
          </div>
          <span className="font-bold text-blue-600">{data.groq_llama3_latency}</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Twilio TTS Synthesis</span>
          </div>
          <span className="font-bold text-purple-600">{data.tts_engine}</span>
        </div>
      </div>
    </Card>
  );
};
