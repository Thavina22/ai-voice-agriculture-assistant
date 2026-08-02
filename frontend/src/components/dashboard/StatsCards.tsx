import React from 'react';
import { Card } from '@/components/ui/Card';
import { PhoneCall, CheckCircle2, Sprout, Languages, ArrowUpRight } from 'lucide-react';
import { DashboardSummary } from '@/types/api';

interface StatsCardsProps {
  data: DashboardSummary | null;
  loading: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="flex items-center space-x-4">
        <div className="p-3 bg-agri-50 dark:bg-agri-950/60 rounded-2xl text-agri-600 dark:text-agri-400">
          <PhoneCall className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Total Calls Managed</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{data.total_calls.toLocaleString()}</h3>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
            <ArrowUpRight className="w-3 h-3" /> +{data.weekly_growth}% this week
          </span>
        </div>
      </Card>

      <Card className="flex items-center space-x-4">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">AI Resolution Rate</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{data.ai_resolution_rate}%</h3>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 block">
            {data.human_kvk_escalations} KVK Escalations
          </span>
        </div>
      </Card>

      <Card className="flex items-center space-x-4">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-2xl text-amber-600 dark:text-amber-400">
          <Sprout className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Supported MVP Crops</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{data.supported_crops_count} Crops</h3>
          <span className="text-[11px] font-semibold text-agri-700 dark:text-agri-300 mt-0.5 block">
            {data.supported_crops.join(' • ')}
          </span>
        </div>
      </Card>

      <Card className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-2xl text-blue-600 dark:text-blue-400">
          <Languages className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Top Voice Language</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{data.top_language} ({data.language_distribution[data.top_language]}%)</h3>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 block">
            Multi-dialect Telephony
          </span>
        </div>
      </Card>
    </div>
  );
};
