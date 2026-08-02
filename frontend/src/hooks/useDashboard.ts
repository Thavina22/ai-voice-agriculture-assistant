import { useState, useEffect, useCallback } from 'react';
import {
  fetchDashboardSummary,
  fetchConsultationHistory,
  fetchWeatherTelemetry,
  fetchMarketPrices,
  fetchGovernmentSchemes,
  fetchKnowledgeSummary,
  fetchAIStatus,
} from '@/services/dashboard';
import {
  DashboardSummary,
  ConsultationItem,
  WeatherTelemetry,
  MarketItem,
  SchemeItem,
  KnowledgeSummary,
  AIStatusData,
} from '@/types/api';

const DEFAULT_SUMMARY: DashboardSummary = {
  total_calls: 1248,
  weekly_growth: 18.4,
  ai_resolution_rate: 94.8,
  human_kvk_escalations: 6,
  supported_crops_count: 3,
  supported_crops: ['Tomato', 'Paddy', 'Chilli'],
  top_language: 'Tamil',
  language_distribution: { Tamil: 52, English: 32, Telugu: 16 },
};

const DEFAULT_HISTORY: ConsultationItem[] = [
  {
    id: 'CALL_101',
    phone: '+91 98765 43210',
    date: '2026-08-01 09:25 AM',
    crop: 'Tomato',
    symptoms: 'Dark brown spots with target-like concentric rings on lower leaves',
    diagnosis: 'Early Blight',
    pathogen: 'Alternaria solani',
    confidence: 96,
    lang: 'Tamil',
    status: 'Completed',
    transcript: 'என் தக்காளி இலையில் கருப்பு புள்ளிகள் மற்றும் மஞ்சள் நிற வளையங்கள் உள்ளன.',
  },
  {
    id: 'CALL_102',
    phone: '+91 91234 56789',
    date: '2026-08-01 08:40 AM',
    crop: 'Paddy',
    symptoms: 'Spindle-shaped lesions with grayish center on leaves',
    diagnosis: 'Blast Disease',
    pathogen: 'Magnaporthe oryzae',
    confidence: 91,
    lang: 'English',
    status: 'Completed',
    transcript: 'My paddy crop has spindle-shaped lesions with grayish center on leaves.',
  },
  {
    id: 'CALL_103',
    phone: '+91 99887 76655',
    date: '2026-07-31 04:15 PM',
    crop: 'Chilli',
    symptoms: 'White powdery growth on lower leaf surface',
    diagnosis: 'Powdery Mildew',
    pathogen: 'Leveillula taurica',
    confidence: 64,
    lang: 'Telugu',
    status: 'KVK Escalated',
    transcript: 'మిరప ఆకులపై తెల్లటి పొడి కనిపిస్తుంది.',
  },
];

const DEFAULT_WEATHER: WeatherTelemetry = {
  region: 'South India Agricultural Belt',
  temperature: 29,
  humidity: 84,
  wind_speed: 12,
  soil_moisture: 68,
  risk_level: 'High Humidity Risk',
  alert_title: 'Late Blight Outbreak Warning',
  alert_message: 'High atmospheric humidity (>80%) increases Late Blight risk in Tomato crops. Inspect lower leaves for white fungal growth.',
};

const DEFAULT_MARKET: MarketItem[] = [
  { commodity: 'Tomato (Hybrid)', market: 'Madanapalle APMC', price: '₹2,400 / quintal', trend: '+5.2%', is_up: true },
  { commodity: 'Paddy (Samba Mahsuri)', market: 'Thanjavur Mandi', price: '₹2,180 / quintal', trend: '+1.8%', is_up: true },
  { commodity: 'Chilli (Teja Variety)', market: 'Guntur APMC', price: '₹18,500 / quintal', trend: '-0.9%', is_up: false },
];

const DEFAULT_SCHEMES: SchemeItem[] = [
  { name: 'PM-KISAN Samman Nidhi', desc: '₹6,000 annual direct income support for farmer households.', status: 'Active Installment', tag: 'Financial' },
  { name: 'PM Fasal Bima Yojana (PMFBY)', desc: 'Comprehensive crop insurance against disease outbreaks and natural perils.', status: 'Kharif Enrollment', tag: 'Insurance' },
  { name: 'Soil Health Card Scheme', desc: 'Free soil testing & NPK nutrient recommendations.', status: 'Free Testing', tag: 'Nutrients' },
];

const DEFAULT_KNOWLEDGE: KnowledgeSummary = {
  total_mvp_diseases: 9,
  crops: [
    { name: 'Tomato', health: 'Moderate Risk', variant: 'warning', active_disease: 'Early Blight (42%)', total_consultations: 580, diseases: ['Early Blight', 'Late Blight', 'Leaf Curl Virus'] },
    { name: 'Paddy', health: 'Good Condition', variant: 'success', active_disease: 'Blast Disease (28%)', total_consultations: 420, diseases: ['Blast Disease', 'Brown Spot', 'Stem Borer'] },
    { name: 'Chilli', health: 'Watch Alert', variant: 'warning', active_disease: 'Powdery Mildew (35%)', total_consultations: 248, diseases: ['Anthracnose', 'Powdery Mildew', 'Aphids Infestation'] },
  ],
};

const DEFAULT_AI_STATUS: AIStatusData = {
  status: 'Operational',
  rca_engine_latency: '0.05s',
  groq_llama3_latency: '0.82s',
  tts_engine: 'Online (Polly Voices)',
  active_models: ['Llama 3 70B (Groq Cloud)', 'FastAPI RCA Engine'],
};

export const useDashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary>(DEFAULT_SUMMARY);
  const [history, setHistory] = useState<ConsultationItem[]>(DEFAULT_HISTORY);
  const [weather, setWeather] = useState<WeatherTelemetry>(DEFAULT_WEATHER);
  const [market, setMarket] = useState<MarketItem[]>(DEFAULT_MARKET);
  const [schemes, setSchemes] = useState<SchemeItem[]>(DEFAULT_SCHEMES);
  const [knowledge, setKnowledge] = useState<KnowledgeSummary>(DEFAULT_KNOWLEDGE);
  const [aiStatus, setAiStatus] = useState<AIStatusData>(DEFAULT_AI_STATUS);

  const [loading, setLoading] = useState<boolean>(false);

  const fetchAll = useCallback(async () => {
    try {
      const results = await Promise.allSettled([
        fetchDashboardSummary(),
        fetchConsultationHistory(),
        fetchWeatherTelemetry(),
        fetchMarketPrices(),
        fetchGovernmentSchemes(),
        fetchKnowledgeSummary(),
        fetchAIStatus(),
      ]);

      if (results[0].status === 'fulfilled' && results[0].value) setSummary(results[0].value);
      if (results[1].status === 'fulfilled' && results[1].value) setHistory(results[1].value);
      if (results[2].status === 'fulfilled' && results[2].value) setWeather(results[2].value);
      if (results[3].status === 'fulfilled' && results[3].value) setMarket(results[3].value);
      if (results[4].status === 'fulfilled' && results[4].value) setSchemes(results[4].value);
      if (results[5].status === 'fulfilled' && results[5].value) setKnowledge(results[5].value);
      if (results[6].status === 'fulfilled' && results[6].value) setAiStatus(results[6].value);
    } catch (err) {
      console.warn('Dashboard telemetry live fetch fallback:', err);
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
    loading,
    refetch: fetchAll,
  };
};
