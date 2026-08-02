import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Landmark, ArrowUpRight, Inbox } from 'lucide-react';
import { SchemeItem } from '@/types/api';

interface GovtSchemesCardProps {
  data: SchemeItem[];
  loading: boolean;
}

export const GovtSchemesCard: React.FC<GovtSchemesCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 rounded-xl">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Government Schemes & Subsidies</h3>
            <p className="text-xs text-gray-400">Direct Farmer Assistance & Insurance</p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-6 text-center text-gray-400 text-xs flex flex-col items-center gap-1">
          <Inbox className="w-6 h-6 opacity-50" />
          <span>No government scheme telemetry found.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  {s.name}
                  <ArrowUpRight className="w-3 h-3 text-agri-600" />
                </h4>
                <Badge variant="neutral">{s.tag}</Badge>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
