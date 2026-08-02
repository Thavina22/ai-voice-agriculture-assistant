import { apiClient } from './api';
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

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await apiClient.get<DashboardSummary>('/api/v1/dashboard/summary');
  return response.data;
};

export const fetchConsultationHistory = async (): Promise<ConsultationItem[]> => {
  const response = await apiClient.get<ConsultationItem[]>('/api/v1/dashboard/history');
  return response.data;
};

export const fetchWeatherTelemetry = async (): Promise<WeatherTelemetry> => {
  const response = await apiClient.get<WeatherTelemetry>('/api/v1/dashboard/weather');
  return response.data;
};

export const fetchMarketPrices = async (): Promise<MarketItem[]> => {
  const response = await apiClient.get<MarketItem[]>('/api/v1/dashboard/market');
  return response.data;
};

export const fetchGovernmentSchemes = async (): Promise<SchemeItem[]> => {
  const response = await apiClient.get<SchemeItem[]>('/api/v1/dashboard/schemes');
  return response.data;
};

export const fetchKnowledgeSummary = async (): Promise<KnowledgeSummary> => {
  const response = await apiClient.get<KnowledgeSummary>('/api/v1/dashboard/knowledge');
  return response.data;
};

export const fetchAIStatus = async (): Promise<AIStatusData> => {
  const response = await apiClient.get<AIStatusData>('/api/v1/dashboard/ai-status');
  return response.data;
};

export const fetchCallSessions = async (): Promise<CallSession[]> => {
  const response = await apiClient.get<CallSession[]>('/api/v1/dashboard/sessions');
  return response.data;
};
