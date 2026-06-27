import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Briefcase, 
  Settings, 
  FileText, 
  Globe, 
  Server,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';

const actions = [
  { id: '1', name: 'CRM & Müşteriler', icon: User, path: '/crm', section: 'Sayfalar' },
  { id: '2', name: 'Aktif İşler (Kanban)', icon: Briefcase, path: '/jobs', section: 'Sayfalar' },
  { id: '3', name: 'Finans', icon: FileText, path: '/finance', section: 'Sayfalar' },
  { id: '4', name: 'Teklif Yönetimi', icon: FileText, path: '/proposals', section: 'Sayfalar' },
  { id: '5', name: 'Domain Takibi', icon: Globe, path: '/domains', section: 'Sayfalar' },
  { id: '6', name: 'Hosting & Sunucu', icon: Server, path: '/hosting', section: 'Sayfalar' },
  { id: '7', name: 'Şifre Kasası', icon: KeyRound, path: '/vault', section: 'Sayfalar' },
  { id: '8', name: 'Ayarlar', icon: Settings, path: '/settings', section: 'Sayfalar' },
  { id: '9', name: 'Gölbaşı Yol Kurtarma (Firma)', icon: User, path: '/crm/f1', section: 'Hızlı Erişim' },
  { id: '10', name: 'Diş Hekimi Ayşe Kaya (Firma)', icon: User, path: '/crm/f2', section: 'Hızlı Erişim' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
        setQuery('');
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredActions = query === '' 
    ? actions 
    : actions.filter(action => action.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredActions[selectedIndex];
        if (selected) {
          navigate(selected.path);
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filteredActions, selectedIndex, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Palette */}
      <div className="relative w-full max-w-xl bg-[#171717] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white px-3 text-lg placeholder:text-text-muted"
            placeholder="Ara (Sayfalar, Müşteriler, İşlemler...)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-block bg-white/10 text-text-muted text-xs px-2 py-1 rounded font-mono font-medium">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-text-muted text-sm">
              "{query}" için sonuç bulunamadı.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredActions.map((action, idx) => {
                const Icon = action.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={action.id}
                    onClick={() => {
                      navigate(action.path);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={clsx(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-left",
                      isSelected ? "bg-primary/10 text-primary" : "text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={clsx("w-5 h-5", isSelected ? "text-primary" : "text-text-muted")} />
                      <span className="font-medium">{action.name}</span>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 opacity-50" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
