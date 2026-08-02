export interface HealthResponse {
  status: string;
  app_name: string;
  version: string;
  environment: string;
  timestamp: string;
}

export interface VoiceIncomingPayload {
  CallSid?: string;
  From?: string;
}

export interface VoiceLanguagePayload {
  CallSid?: string;
  From?: string;
  Digits?: string;
}

export interface VoiceRecordingPayload {
  lang?: string;
  CallSid?: string;
  From?: string;
  RecordingSid?: string;
  RecordingUrl?: string;
  RecordingDuration?: string;
}

export interface DashboardSummary {
  total_calls: number;
  weekly_growth: number;
  ai_resolution_rate: number;
  human_kvk_escalations: number;
  supported_crops_count: number;
  supported_crops: string[];
  top_language: string;
  language_distribution: Record<string, number>;
}

export interface ConsultationItem {
  id: string;
  phone: string;
  date: string;
  crop: string;
  symptoms: string;
  diagnosis: string;
  pathogen: string;
  confidence: number;
  lang: string;
  status: string;
  transcript: string;
}

export interface WeatherTelemetry {
  region: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  soil_moisture: number;
  risk_level: string;
  alert_title: string;
  alert_message: string;
}

export interface MarketItem {
  commodity: string;
  market: string;
  price: string;
  trend: string;
  is_up: boolean;
}

export interface SchemeItem {
  name: string;
  desc: string;
  status: string;
  tag: string;
}

export interface CropHealthInfo {
  name: string;
  health: string;
  variant: 'success' | 'warning' | 'danger' | 'info';
  active_disease: string;
  total_consultations: number;
  diseases: string[];
}

export interface KnowledgeSummary {
  total_mvp_diseases: number;
  crops: CropHealthInfo[];
}

export interface AIStatusData {
  status: string;
  rca_engine_latency: string;
  groq_llama3_latency: string;
  tts_engine: string;
  active_models: string[];
}

export interface CallSession {
  call_sid: string;
  caller_number: string;
  selected_language: string;
  language_code: string;
  current_stage: string;
  recording_sid?: string;
  recording_url?: string;
  recording_duration?: number;
  transcript?: string;
  ai_response?: string;
  timestamp: string;
}
