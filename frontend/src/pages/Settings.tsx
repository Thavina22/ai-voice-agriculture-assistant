import React from 'react';
import { Card } from '@/components/ui/Card';
import { Sliders, Shield, Save } from 'lucide-react';


export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Telephony webhooks, Knowledge Engine thresholds, and AI model parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Telephony Settings */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-gray-100 dark:border-dark-border pb-3">
            <div className="p-2 bg-agri-600 text-white rounded-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Telephony Webhook Configuration</h3>
              <p className="text-xs text-gray-400">Twilio Voice API parameters</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Twilio Webhook URL</label>
              <input
                type="text"
                readOnly
                value="http://127.0.0.1:8000/api/v1/voice/incoming"
                className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border font-mono text-gray-800 dark:text-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Recording Timeout</label>
                <input
                  type="text"
                  defaultValue="5 seconds"
                  className="w-full p-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Max Length</label>
                <input
                  type="text"
                  defaultValue="30 seconds"
                  className="w-full p-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* RCA & AI Model Settings */}
        <Card className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-gray-100 dark:border-dark-border pb-3">
            <div className="p-2 bg-agri-600 text-white rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Knowledge Engine & Safety Thresholds</h3>
              <p className="text-xs text-gray-400">Explainable AI & human escalation rules</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">LLM Model</label>
              <select className="w-full p-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border">
                <option>Llama 3 70B (Groq Cloud API)</option>
                <option>Llama 3 8B (Fast Latency)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Minimum Confidence Threshold for Diagnosis</label>
              <input
                type="text"
                defaultValue="70% (Escalate below this)"
                className="w-full p-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border"
              />
            </div>
          </div>

          <div className="pt-2">
            <button className="px-4 py-2 bg-agri-600 text-white rounded-xl font-bold text-xs flex items-center space-x-2 shadow-md shadow-agri-600/30">
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
