import React, { useState } from 'react';
import { Users, Briefcase, FileSignature, DollarSign, Receipt, Server, Globe, Key, FileBox, StickyNote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientStore } from '../../../store/useClientStore';
import { ClientSelector } from '../../../components/layout/ClientSelector';
import { EmptyClientState } from '../../../components/layout/EmptyClientState';

// Import Tabs
import { CrmTab } from './tabs/CrmTab';
import { FinanceTab } from './tabs/FinanceTab';
import { PasswordVaultTab } from './tabs/PasswordVaultTab';
import { ActiveJobsTab } from './tabs/ActiveJobsTab';
import { OffersTab } from './tabs/OffersTab';
import { InvoicesTab } from './tabs/InvoicesTab';
import { HostingTab } from './tabs/HostingTab';
import { DomainTab } from './tabs/DomainTab';
import { FilesTab } from './tabs/FilesTab';
import { NotesTab } from './tabs/NotesTab';

const TABS = [
  { id: 'crm', label: 'CRM', icon: <Users size={16} />, component: CrmTab },
  { id: 'jobs', label: 'Aktif İşler', icon: <Briefcase size={16} />, component: ActiveJobsTab },
  { id: 'offers', label: 'Teklifler', icon: <FileSignature size={16} />, component: OffersTab },
  { id: 'finance', label: 'Finans', icon: <DollarSign size={16} />, component: FinanceTab },
  { id: 'invoices', label: 'Faturalar', icon: <Receipt size={16} />, component: InvoicesTab },
  { id: 'hosting', label: 'Hosting', icon: <Server size={16} />, component: HostingTab },
  { id: 'domain', label: 'Domain', icon: <Globe size={16} />, component: DomainTab },
  { id: 'vault', label: 'Şifre Kasası', icon: <Key size={16} />, component: PasswordVaultTab },
  { id: 'files', label: 'Dosyalar', icon: <FileBox size={16} />, component: FilesTab },
  { id: 'notes', label: 'Notlar', icon: <StickyNote size={16} />, component: NotesTab },
];

export const ErpDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const { activeClientId } = useClientStore();

  if (!activeClientId) {
    return <EmptyClientState />;
  }

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || CrmTab;

  return (
    <div className="flex flex-col w-full h-full bg-[#000000] text-white">
      {/* Top Header */}
      <header className="glass-header px-4 py-4 md:px-8 md:py-6 sticky top-0 z-40">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4 md:gap-0">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gradient mb-1">ERP & İşletme</h1>
            <p className="text-xs md:text-sm text-gray-400 mb-4">Ajans Genel Yönetim Paneli</p>
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
            key={activeTab + activeClientId} // Re-animate when client changes
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
