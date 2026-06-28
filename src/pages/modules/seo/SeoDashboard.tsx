import React, { useState } from 'react';
import { LayoutDashboard, Key, Wrench, FileText, Crosshair, MapPin, Target, BarChart2, Search, BrainCircuit, Link2, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientStore } from '../../../store/useClientStore';
import { ClientSelector } from '../../../components/layout/ClientSelector';
import { EmptyClientState } from '../../../components/layout/EmptyClientState';

// Import Tabs
import { DashboardTab } from './tabs/DashboardTab';
import { ProfileTab } from './tabs/ProfileTab';
import { KeywordsTab } from './tabs/KeywordsTab';
import { TechSeoTab } from './tabs/TechSeoTab';
import { ContentTab } from './tabs/ContentTab';
import { CompetitorsTab } from './tabs/CompetitorsTab';
import { GoogleBusinessTab } from './tabs/GoogleBusinessTab';
import { GoogleAdsTab } from './tabs/GoogleAdsTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { SearchConsoleTab } from './tabs/SearchConsoleTab';
import { BacklinkTab } from './tabs/BacklinkTab';
import { AIAssistantTab } from './tabs/AIAssistantTab';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, component: DashboardTab },
  { id: 'profile', label: 'Müşteri Dosyası', icon: <FolderOpen size={16} />, component: ProfileTab },
  { id: 'keywords', label: 'Kelime Takibi', icon: <Key size={16} />, component: KeywordsTab },
  { id: 'tech', label: 'Teknik SEO', icon: <Wrench size={16} />, component: TechSeoTab },
  { id: 'content', label: 'İçerikler', icon: <FileText size={16} />, component: ContentTab },
  { id: 'competitors', label: 'Rakip Analizi', icon: <Crosshair size={16} />, component: CompetitorsTab },
  { id: 'gmb', label: 'Google Business', icon: <MapPin size={16} />, component: GoogleBusinessTab },
  { id: 'ads', label: 'Google Ads', icon: <Target size={16} />, component: GoogleAdsTab },
  { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={16} />, component: AnalyticsTab },
  { id: 'gsc', label: 'Search Console', icon: <Search size={16} />, component: SearchConsoleTab },
  { id: 'backlink', label: 'Backlink', icon: <Link2 size={16} />, component: BacklinkTab },
  { id: 'ai', label: 'AI Asistan', icon: <BrainCircuit size={16} />, component: AIAssistantTab },
];

export const SeoDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const { activeClientId } = useClientStore();

  if (!activeClientId) {
    return <EmptyClientState />;
  }

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || DashboardTab;

  return (
    <div className="flex flex-col w-full h-full bg-[#000000] text-white">
      {/* Top Header */}
      <header className="glass-header px-4 py-4 md:px-8 md:py-6 sticky top-0 z-40">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 md:gap-0">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient mb-1">SEO Yönetimi</h1>
            <p className="text-xs md:text-sm text-gray-400 mb-4">Müşteri Bazlı SEO ve Analiz Paneli</p>
            <ClientSelector />
          </div>
          
          {/* Module Sub-navigation */}
          <div className="flex bg-black/50 p-1 rounded-xl border border-white/5 backdrop-blur-md overflow-x-auto hide-scrollbar w-full md:w-auto md:max-w-3xl">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + activeClientId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto h-full pb-20"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
