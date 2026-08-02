import React from 'react';
import { Card } from '@/components/ui/Card';
import { PhoneIncoming, Layers } from 'lucide-react';
import { CallSession } from '@/types/api';

interface CallSessionsCardProps {
  data: CallSession[];
  loading: boolean;
}

export const CallSessionsCard: React.FC<CallSessionsCardProps> = ({ data, loading }) => {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-dark-border">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <PhoneIncoming className="w-4 h-4 text-agri-600 dark:text-agri-400" />
            Call Session Tracker
          </h3>
          <p className="text-xs text-gray-400">Live call session state from Twilio / local backend.</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-10 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="py-8 text-center text-gray-400 space-y-2">
          <Layers className="w-8 h-8 mx-auto opacity-50" />
          <p className="text-xs">No active voice sessions found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((session) => (
            <div key={session.call_sid} className="rounded-3xl border border-gray-100 dark:border-dark-border p-4 bg-white dark:bg-dark-bg shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{session.call_sid}</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{session.caller_number}</h4>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Stage</p>
                  <p className="font-semibold text-agri-700 dark:text-agri-300">{session.current_stage}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 text-xs text-gray-500">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Language</p>
                  <p>{session.selected_language}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Timestamp</p>
                  <p>{session.timestamp}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Transcript</p>
                  <p className="truncate max-w-full">{session.transcript ?? 'Pending'}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">AI Response</p>
                  <p className="truncate max-w-full">{session.ai_response ?? 'Pending'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
