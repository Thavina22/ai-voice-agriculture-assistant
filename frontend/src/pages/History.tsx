import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, Calendar, Phone } from 'lucide-react';


export const History: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Call & Diagnosis History</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Archived call sessions, spoken transcripts, and Knowledge Engine RCA results.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcript or disease..."
              className="pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-agri-500"
            />
          </div>
          <button className="p-2 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          {
            phone: '+91 98765 43210',
            date: '2026-08-01 09:25 AM',
            crop: 'Tomato',
            disease: 'Early Blight',
            confidence: '96%',
            lang: 'Tamil',
            transcript: 'என் தக்காளி இலையில் கருப்பு புள்ளிகள் மற்றும் மஞ்சள் நிற வளையங்கள் உள்ளன.',
            status: 'Completed'
          },
          {
            phone: '+91 91234 56789',
            date: '2026-08-01 08:40 AM',
            crop: 'Paddy',
            disease: 'Blast Disease',
            confidence: '91%',
            lang: 'English',
            transcript: 'My paddy crop has spindle-shaped lesions with grayish center on leaves.',
            status: 'Completed'
          },
          {
            phone: '+91 99887 76655',
            date: '2026-07-31 04:15 PM',
            crop: 'Chilli',
            disease: 'Powdery Mildew',
            confidence: '64%',
            lang: 'Telugu',
            transcript: 'మిరప ఆకులపై తెల్లటి పొడి కనిపిస్తుంది.',
            status: 'KVK Escalated'
          }
        ].map((item, idx) => (
          <Card key={idx} className="space-y-3 hover:border-agri-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-dark-border pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-agri-50 dark:bg-agri-950/60 text-agri-600 rounded-xl">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.phone}</h4>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant={item.status === 'Completed' ? 'success' : 'warning'}>{item.status}</Badge>
                <Badge variant="neutral">{item.lang}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Target Crop</span>
                <span className="font-bold text-gray-900 dark:text-white">{item.crop}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Diagnosed Disease</span>
                <span className="font-bold text-agri-700 dark:text-agri-300">{item.disease} ({item.confidence})</span>
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Spoken Audio Transcript</span>
                <p className="text-gray-600 dark:text-gray-300 italic truncate">{item.transcript}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
