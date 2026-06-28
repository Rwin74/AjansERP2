import React, { useState, useRef, useEffect } from 'react';
import { useClientStore } from '../../store/useClientStore';
import { Building, ChevronDown, Search, Plus, Check, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClientSelector = () => {
  const { clients, activeClientId, setActiveClient, deleteClient } = useClientStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const activeClient = clients.find(c => c.id === activeClientId);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="text-xs text-gray-500 mb-1 font-medium tracking-wide">Aktif Müşteri</div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg px-4 py-2.5 transition-all text-sm font-semibold"
      >
        <div className="flex items-center gap-2 truncate">
          <Building size={16} className="text-blue-400" />
          <span className="truncate">{activeClient ? activeClient.name : 'Müşteri Seçin...'}</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-[#0f0f11] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Müşteri ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredClients.length > 0 ? (
              <div className="p-2 space-y-1">
                {filteredClients.map(client => (
                  <div key={client.id} className={`flex items-center justify-between rounded-lg px-2 py-1.5 transition-all group ${
                      activeClientId === client.id 
                        ? 'bg-blue-500/10' 
                        : 'hover:bg-white/5'
                  }`}>
                    <button
                      onClick={() => {
                        setActiveClient(client.id);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`flex-1 flex items-center justify-between text-sm text-left truncate ${
                        activeClientId === client.id ? 'text-blue-400 font-medium' : 'text-gray-300'
                      }`}
                    >
                      <span className="truncate">{client.name}</span>
                      {activeClientId === client.id && <Check size={14} className="mr-2" />}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`${client.name} isimli müşteriyi silmek istediğinize emin misiniz?`)) {
                          deleteClient(client.id);
                        }
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      title="Müşteriyi Sil"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                Sonuç bulunamadı.
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-white/5 bg-white/[0.02]">
            <button 
              onClick={() => {
                setIsOpen(false);
                navigate('/seo-hazirlik');
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
            >
              <Plus size={16} />
              Yeni Müşteri Oluştur
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
