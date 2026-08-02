import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, HelpCircle } from 'lucide-react';


const cropData = [
  {
    crop: 'Tomato',
    diseases: [
      {
        name: 'Early Blight',
        pathogen: 'Alternaria solani',
        symptoms: ['Dark brown spots with target-like concentric rings', 'Yellowing around older leaves', 'Stem lesions'],
        verification: ['Are concentric rings visible inside the brown spots?', 'Did yellowing start from the lower leaves?'],
        treatment: 'Apply Mancozeb 75% WP @ 2g/L water. Ensure proper spacing for airflow.'
      },
      {
        name: 'Late Blight',
        pathogen: 'Phytophthora infestans',
        symptoms: ['Large dark water-soaked leaf spots', 'White fuzzy mold on leaf underside', 'Rapid plant wilting'],
        verification: ['Is there white fuzzy growth under the leaves?', 'Did spots appear after high humidity?'],
        treatment: 'Spray Metalaxyl + Mancozeb @ 2g/L. Destroy infected plant debris.'
      },
      {
        name: 'Leaf Curl Virus',
        pathogen: 'Begomovirus',
        symptoms: ['Upward curling of leaves', 'Stunted plant growth', 'Yellowing leaf margins'],
        verification: ['Are leaves curling upwards like a cup?', 'Are whiteflies present on the underside?'],
        treatment: 'Control whitefly vector using Imidacloprid 17.8 SL @ 0.5ml/L. Remove infected plants.'
      }
    ]
  },
  {
    crop: 'Paddy',
    diseases: [
      {
        name: 'Blast Disease',
        pathogen: 'Magnaporthe oryzae',
        symptoms: ['Spindle-shaped lesions with grayish center', 'Neck rot', 'Panicle blast'],
        verification: ['Are leaf spots shaped like eye/spindle?', 'Is the leaf margin dark reddish-brown?'],
        treatment: 'Spray Tricyclazole 75 WP @ 0.6 g/L. Avoid excess Nitrogen application.'
      },
      {
        name: 'Brown Spot',
        pathogen: 'Bipolaris oryzae',
        symptoms: ['Oval brown spots on leaves', 'Yellow halo around spots', 'Grain discoloration'],
        verification: ['Are spots small and oval?', 'Is soil deficient in Potassium?'],
        treatment: 'Apply Mancozeb @ 2 g/L. Apply balanced NPK fertilizers.'
      },
      {
        name: 'Stem Borer',
        pathogen: 'Scirpophaga incertulas',
        symptoms: ['Dead hearts in vegetative stage', 'White heads in flowering stage'],
        verification: ['Can the central tiller be easily pulled out?', 'Are egg masses visible on leaf tips?'],
        treatment: 'Apply Chlorantraniliprole 0.4% GR @ 4 kg/acre in standing water.'
      }
    ]
  },
  {
    crop: 'Chilli',
    diseases: [
      {
        name: 'Anthracnose / Fruit Rot',
        pathogen: 'Colletotrichum capsici',
        symptoms: ['Sunken circular spots on fruits', 'Black dots inside spots', 'Fruit drying'],
        verification: ['Are circular sunken lesions present on ripe fruits?', 'Are fruits shriveling?'],
        treatment: 'Spray Azoxystrobin 23% SC @ 1 ml/L. Use disease-free certified seeds.'
      },
      {
        name: 'Powdery Mildew',
        pathogen: 'Leveillula taurica',
        symptoms: ['White powdery growth on lower leaf surface', 'Yellow patches on upper surface', 'Defoliation'],
        verification: ['Is white dust visible under leaves?', 'Do leaves drop prematurely?'],
        treatment: 'Spray Wettable Sulphur 80 WP @ 3 g/L or Hexaconazole 5 EC @ 1 ml/L.'
      },
      {
        name: 'Aphids Infestation',
        pathogen: 'Aphis gossypii',
        symptoms: ['Sooty mold on leaves', 'Curled tender shoots', 'Sticky honeydew secretions'],
        verification: ['Are tiny green/black insects clustered under leaves?', 'Is foliage sticky?'],
        treatment: 'Spray Neem oil 10,000 ppm @ 3 ml/L or Thiamethoxam 25 WG @ 0.2 g/L.'
      }
    ]
  }
];

export const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tomato');

  const selectedCrop = cropData.find((c) => c.crop === activeTab) || cropData[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crop Knowledge Base & RCA Matrix</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deterministic symptom trees, verification question sets, and scientific treatments for MVP crops.</p>
      </div>

      {/* Crop Selector Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-dark-border pb-2">
        {cropData.map((c) => (
          <button
            key={c.crop}
            onClick={() => setActiveTab(c.crop)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === c.crop
                ? 'bg-agri-600 text-white shadow-md shadow-agri-600/25'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {c.crop}
          </button>
        ))}
      </div>

      {/* Disease Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedCrop.diseases.map((d, idx) => (
          <Card key={idx} className="space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{d.name}</h3>
                <Badge variant="info">{selectedCrop.crop}</Badge>
              </div>
              <p className="text-xs text-agri-700 dark:text-agri-400 italic font-semibold">{d.pathogen}</p>

              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    Key Symptoms
                  </h4>
                  <ul className="mt-1 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    {d.symptoms.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-agri-500"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                    RCA Verification Questions
                  </h4>
                  <ul className="mt-1 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    {d.verification.map((v, vIdx) => (
                      <li key={vIdx} className="italic text-gray-500 dark:text-gray-400">
                        • "{v}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-dark-border mt-4">
              <span className="text-[11px] font-bold text-gray-400 block uppercase">Recommended Treatment</span>
              <p className="text-xs font-medium text-agri-800 dark:text-agri-300 mt-0.5 bg-agri-50 dark:bg-agri-950/40 p-2.5 rounded-xl border border-agri-200/60 dark:border-agri-900">
                {d.treatment}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
