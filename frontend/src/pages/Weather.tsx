import React from 'react';
import { Card } from '@/components/ui/Card';
import { CloudSun, Droplets, Wind, Thermometer, ShieldAlert } from 'lucide-react';


export const Weather: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agricultural Weather & Disease Risk</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Microclimate data & humidity-based fungal outbreak alerts.</p>
      </div>

      {/* Main Weather Widget */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center space-x-4 bg-gradient-to-br from-agri-600 to-agri-800 text-white">
          <CloudSun className="w-10 h-10 text-agri-200" />
          <div>
            <span className="text-xs text-agri-200 block font-medium">Regional Climate</span>
            <h3 className="text-2xl font-bold">29°C</h3>
            <span className="text-xs text-agri-100">Partly Cloudy</span>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-2xl text-blue-600">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Relative Humidity</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">84%</h3>
            <span className="text-[11px] font-semibold text-amber-600">High Fungal Risk</span>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-2xl text-teal-600">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Wind Speed</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">12 km/h</h3>
            <span className="text-[11px] text-gray-500">SE Breeze</span>
          </div>
        </Card>

        <Card className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl text-emerald-600">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Soil Moisture</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">68%</h3>
            <span className="text-[11px] text-emerald-600 font-semibold">Optimal for Tomato</span>
          </div>
        </Card>
      </div>

      {/* Disease Outbreak Alert Banner */}
      <Card className="border-amber-500/30 bg-amber-500/5 space-y-3">
        <div className="flex items-center space-x-3 text-amber-600 dark:text-amber-400">
          <ShieldAlert className="w-6 h-6 flex-shrink-0" />
          <div>
            <h3 className="text-md font-bold">Late Blight Outbreak Warning (High Humidity Alert)</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              High atmospheric humidity (&gt;80%) coupled with moderate temperatures (20-24°C) increases 
              Late Blight risks in Tomato crops. Advise callers to inspect leaf undersides for white mold.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
