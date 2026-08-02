import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Phone, Inbox } from 'lucide-react';
import { ConsultationItem } from '@/types/api';

interface RecentConsultationsCardProps {
  data: ConsultationItem[];
  loading: boolean;
}

export const RecentConsultationsCard: React.FC<RecentConsultationsCardProps> = ({ data, loading }) => {
  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-dark-border">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-agri-600 dark:text-agri-400" />
            Recent Farmer Consultations
          </h3>
          <p className="text-xs text-gray-400">Live Voice Call logs & Diagnosis Telemetry</p>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search consultations..."
            className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-agri-500"
          />
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
          <Inbox className="w-8 h-8 mx-auto opacity-50" />
          <p className="text-xs">No recent call telemetry available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-dark-bg/60 text-gray-500 dark:text-gray-400 uppercase font-semibold">
              <tr>
                <th className="p-3 rounded-l-xl">Caller</th>
                <th className="p-3">Language</th>
                <th className="p-3">Crop</th>
                <th className="p-3">Symptoms</th>
                <th className="p-3">RCA Diagnosis</th>
                <th className="p-3">Score</th>
                <th className="p-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border font-medium">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-agri-50/50 dark:hover:bg-agri-950/20 transition-colors">
                  <td className="p-3 font-semibold text-gray-900 dark:text-white">{item.phone}</td>
                  <td className="p-3"><Badge variant="info">{item.lang}</Badge></td>
                  <td className="p-3 font-medium">{item.crop}</td>
                  <td className="p-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">{item.symptoms}</td>
                  <td className="p-3 font-semibold text-agri-700 dark:text-agri-300">{item.diagnosis}</td>
                  <td className="p-3">
                    <span className={`font-bold ${item.confidence >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {item.confidence}%
                    </span>
                  </td>
                  <td className="p-3">
                    <Badge variant={item.status === 'Completed' ? 'success' : 'warning'}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
