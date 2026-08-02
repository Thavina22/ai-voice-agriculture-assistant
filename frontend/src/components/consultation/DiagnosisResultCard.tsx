import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Brain, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface DiagnosisResultCardProps {
  transcript: string;
  languageName: string;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  transcript,
  languageName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card className="space-y-6 border-agri-500/40 bg-gradient-to-b from-white to-agri-50/20 dark:from-dark-card dark:to-agri-950/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-dark-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-agri-600 text-white rounded-2xl shadow-lg shadow-agri-600/30">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Explainable RCA Diagnosis</h3>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Knowledge Engine Reasoning Matrix Result</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="success">96% High Confidence</Badge>
            <Badge variant="warning">Moderate Severity</Badge>
          </div>
        </div>

        {/* 1. Spoken Transcript */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            1. Spoken Audio Transcript ({languageName})
          </span>
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-200/80 dark:border-dark-border italic text-xs text-gray-700 dark:text-gray-200">
            "{transcript}"
          </div>
        </div>

        {/* 2. Diagnosed Disease */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-agri-500/10 via-emerald-500/10 to-transparent border border-agri-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-agri-700 dark:text-agri-400 uppercase tracking-wider block">
              2. Diagnosed Crop Disease
            </span>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">Tomato Early Blight</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Fungal pathogen: Alternaria solani</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-gray-400 block">Root Cause Match</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">96% Confidence</span>
          </div>
        </div>

        {/* 3. Safe Farmer Recommendation */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-agri-600" />
            3. AI Spoken Recommendation (Synthesized for Telephony)
          </span>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-agri-200 dark:border-dark-border shadow-sm space-y-2">
            <p className="text-xs leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
              "Your tomato plant leaves show symptoms of Early Blight fungal infection. Please apply <strong>Mancozeb 75% WP @ 2 grams per liter</strong> of water. Ensure proper plant spacing for sunlight and airflow, and avoid overhead watering."
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-[11px] text-gray-400">
              <span>Voice Synthesis: Polly.Valluvar / Polly.Aditi</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Human Escalation Threshold Un-triggered (&gt;70%)
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
