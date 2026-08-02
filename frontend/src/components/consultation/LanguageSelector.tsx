import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Languages, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageSelectorProps {
  loading: boolean;
  selectedDigit: string | null;
  onSelectLanguage: (digit: string, langName: string, langCode: string) => void;
}

const languages = [
  { digit: '1', name: 'Tamil', nativeName: 'தமிழ்', code: 'ta-IN' },
  { digit: '2', name: 'English', nativeName: 'English', code: 'en-IN' },
  { digit: '3', name: 'Telugu', nativeName: 'తెలుగు', code: 'te-IN' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  loading,
  selectedDigit,
  onSelectLanguage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="space-y-4 border-agri-500/30">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-xl">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">IVR Language Selection</h3>
              <p className="text-xs text-gray-400">Select touch-tone keypress for farmer preference</p>
            </div>
          </div>
          <Badge variant="info">Step 2 of 4</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {languages.map((lang) => {
            const isSelected = selectedDigit === lang.digit;
            return (
              <button
                key={lang.digit}
                onClick={() => onSelectLanguage(lang.digit, lang.name, lang.code)}
                disabled={loading}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-agri-600 text-white border-agri-600 shadow-md shadow-agri-600/30'
                    : 'bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-dark-border hover:border-agri-500 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}>
                    Press {lang.digit}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                <div>
                  <h4 className="text-base font-bold">{lang.name}</h4>
                  <p className={`text-xs ${isSelected ? 'text-agri-100' : 'text-gray-400'}`}>
                    {lang.nativeName}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="flex items-center justify-center space-x-2 text-xs text-agri-600 font-semibold py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending POST /api/v1/voice/language...</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
