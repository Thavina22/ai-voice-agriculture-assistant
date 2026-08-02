import { useState, useEffect, useCallback } from 'react';
import {
  fetchDashboardSummary,
  fetchConsultationHistory,
  fetchWeatherTelemetry,
  fetchMarketPrices,
  fetchGovernmentSchemes,
  fetchKnowledgeSummary,
  fetchAIStatus,
  fetchCallSessions,
} from '@/services/dashboard';
import {
  DashboardSummary,
  ConsultationItem,
  WeatherTelemetry,
  MarketItem,
  SchemeItem,
  KnowledgeSummary,
  AIStatusData,
  CallSession,
} from '@/types/api';

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [history, setHistory] = useState<ConsultationItem[]>([]);
  const [weather, setWeather] = useState<WeatherTelemetry | null>(null);
  const [market, setMarket] = useState<MarketItem[]>([]);
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeSummary | null>(null);
  const [aiStatus, setAiStatus] = useState<AIStatusData | null>(null);
  const [sessions, setSessions] = useState<CallSession[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        fetchDashboardSummary(),
        fetchConsultationHistory(),
        fetchWeatherTelemetry(),
        fetchMarketPrices(),
        fetchGovernmentSchemes(),
        fetchKnowledgeSummary(),
        fetchAIStatus(),
        fetchCallSessions(),
      ]);

      if (results[0].status === 'fulfilled') setSummary(results[0].value);
      if (results[1].status === 'fulfilled') setHistory(results[1].value);
      if (results[2].status === 'fulfilled') setWeather(results[2].value);
      if (results[3].status === 'fulfilled') setMarket(results[3].value);
      if (results[4].status === 'fulfilled') setSchemes(results[4].value);
      if (results[5].status === 'fulfilled') setKnowledge(results[5].value);
      if (results[6].status === 'fulfilled') setAiStatus(results[6].value);
      if (results[7].status === 'fulfilled') setSessions(results[7].value);
    } catch (err) {
      console.warn('Dashboard fetch warning:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    summary,
    history,
    weather,
    market,
    schemes,
    knowledge,
    aiStatus,
    sessions,
    loading,
    refetch: fetchAll,
  };
};
