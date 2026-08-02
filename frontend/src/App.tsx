import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/theme/ThemeContext';
import { ToastProvider } from '@/components/ui/Toast';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { VoiceConsultation } from '@/pages/VoiceConsultation';
import { History } from '@/pages/History';
import { KnowledgeBase } from '@/pages/KnowledgeBase';
import { Weather } from '@/pages/Weather';
import { Settings } from '@/pages/Settings';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="consultation" element={<VoiceConsultation />} />
              <Route path="history" element={<History />} />
              <Route path="knowledge" element={<KnowledgeBase />} />
              <Route path="weather" element={<Weather />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;

