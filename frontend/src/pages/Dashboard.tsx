import React from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentConsultationsCard } from '@/components/dashboard/RecentConsultationsCard';
import { CropHealthSummaryCard } from '@/components/dashboard/CropHealthSummaryCard';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { AIStatusCard } from '@/components/dashboard/AIStatusCard';
import { GovtSchemesCard } from '@/components/dashboard/GovtSchemesCard';
import { MarketPricesCard } from '@/components/dashboard/MarketPricesCard';
import { KnowledgeSummaryCard } from '@/components/dashboard/KnowledgeSummaryCard';
import { Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    summary,
    history,
    weather,
    market,
    schemes,
    knowledge,
    aiStatus,
    loading,
  } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-agri-900 via-agri-800 to-agri-950 p-6 rounded-3xl text-white shadow-xl shadow-agri-950/20">
        <div>
          <div className="flex items-center space-x-2 text-agri-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Agriculture Voice Platform</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">Farmer Telephony Command Center</h1>
          <p className="text-agri-200/80 text-sm mt-1">Real-time voice telemetry, Explainable RCA Engine, and live diagnostic call logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-center">
            <span className="text-xs text-agri-200 block">Active MVP Crops</span>
            <span className="text-sm font-bold text-white">Tomato • Paddy • Chilli</span>
          </div>
        </div>
      </div>

      {/* 1. Statistics Cards */}
      <StatsCards data={summary} loading={loading} />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Main Feed) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Recent Consultations */}
          <RecentConsultationsCard data={history} loading={loading} />

          {/* 3. Crop Health Summary */}
          <CropHealthSummaryCard data={knowledge} loading={loading} />

          {/* 4. Government Schemes Card */}
          <GovtSchemesCard data={schemes} loading={loading} />
        </div>

        {/* Right Column (Side Widgets) */}
        <div className="space-y-6">
          {/* 5. Weather Card */}
          <WeatherCard data={weather} loading={loading} />

          {/* 6. AI Status Card */}
          <AIStatusCard data={aiStatus} loading={loading} />

          {/* 7. Market Prices Card */}
          <MarketPricesCard data={market} loading={loading} />

          {/* 8. Knowledge Card */}
          <KnowledgeSummaryCard data={knowledge} loading={loading} />
        </div>
      </div>
    </div>
  );
};
