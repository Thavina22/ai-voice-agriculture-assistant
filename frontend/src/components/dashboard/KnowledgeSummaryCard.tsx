import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen } from 'lucide-react';
import { KnowledgeSummary } from '@/types/api';

interface KnowledgeSummaryCardProps {
  data: KnowledgeSummary | null;
  loading: boolean;
}

export const KnowledgeSummaryCard: React.FC<KnowledgeSummaryCardProps> = ({ data, loading }) => {
  if (loading || !data) {
    return (
      <Card className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
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
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Knowledge Engine Rule Matrix</h3>
            <p className="text-xs text-gray-400">Explainable RCA Rules & Verification Logic</p>
          </div>
        </div>
        <Badge variant="success">{data.total_mvp_diseases} MVP Diseases</Badge>
      </div>

      <div className="space-y-2 text-xs">
        {data.crops.map((crop, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg flex items-center justify-between">
            <span className="font-semibold text-gray-700 dark:text-gray-300">{crop.name} Diseases</span>
            <span className="text-agri-700 dark:text-agri-300 font-bold">{crop.diseases.join(' • ')}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
