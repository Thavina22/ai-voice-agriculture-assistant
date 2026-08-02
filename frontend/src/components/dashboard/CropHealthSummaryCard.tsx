import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Sprout, AlertCircle } from 'lucide-react';
import { KnowledgeSummary } from '@/types/api';

interface CropHealthSummaryCardProps {
  data: KnowledgeSummary | null;
  loading: boolean;
}

export const CropHealthSummaryCard: React.FC<CropHealthSummaryCardProps> = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <Card className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
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
          <div className="p-2 bg-agri-50 dark:bg-agri-950/60 text-agri-600 rounded-xl">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">MVP Crop Health Summary</h3>
            <p className="text-xs text-gray-400">Tomato, Paddy & Chilli Disease Prevalence</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.crops.map((crop, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{crop.name}</h4>
                <Badge variant={crop.variant}>{crop.health}</Badge>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-500" /> Top Alert: <strong className="text-gray-800 dark:text-gray-200">{crop.active_disease}</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-400 block font-medium">Consultations</span>
              <span className="text-xs font-bold text-agri-700 dark:text-agri-300">{crop.total_consultations}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
