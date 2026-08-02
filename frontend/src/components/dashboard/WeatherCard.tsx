import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CloudSun, Droplets, Wind, ShieldAlert } from 'lucide-react';
import { WeatherTelemetry } from '@/types/api';

interface WeatherCardProps {
  data: WeatherTelemetry | null;
  loading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, loading }) => {
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
          <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-xl">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Regional Weather & Microclimate</h3>
            <p className="text-xs text-gray-400">{data.region}</p>
          </div>
        </div>
        <Badge variant="warning">{data.risk_level}</Badge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center py-1">
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg">
          <span className="text-[11px] text-gray-400 block font-medium">Temperature</span>
          <span className="text-base font-bold text-gray-900 dark:text-white">{data.temperature}°C</span>
        </div>
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg">
          <span className="text-[11px] text-gray-400 block font-medium flex items-center justify-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" /> Humidity
          </span>
          <span className="text-base font-bold text-blue-600 dark:text-blue-400">{data.humidity}%</span>
        </div>
        <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg">
          <span className="text-[11px] text-gray-400 block font-medium flex items-center justify-center gap-1">
            <Wind className="w-3 h-3 text-teal-500" /> Wind
          </span>
          <span className="text-base font-bold text-gray-900 dark:text-white">{data.wind_speed} km/h</span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start space-x-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 dark:text-amber-300 font-medium">
          {data.alert_message}
        </p>
      </div>
    </Card>
  );
};
