import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Search, 
  Copy, 
  Eye, 
  EyeOff,
  Lock,
  Plus,
  Trash2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

export function Vault() {
  const { vaultItems, fetchVaultItems, addVaultItem, deleteVaultItem } = useStore();
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVault, setNewVault] = useState({ title: '', url: '', username: '', password: '', category: 'Web Sitesi' });

  useEffect(() => {
    fetchVaultItems();
  }, [fetchVaultItems]);

  const togglePassword = (id: string) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addVaultItem(newVault);
    setIsModalOpen(false);
    setNewVault({ title: '', url: '', username: '', password: '', category: 'Web Sitesi' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Şifre Kasası <Lock className="w-5 h-5 text-emerald-500" />
          </h1>
          <p className="text-sm text-text-muted mt-1">Müşteri şifrelerini AES-256 şifreleme mantığıyla güvenle saklayın.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Şifre Ekle
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-surface/30 flex justify-between items-center">
           <div className="relative group w-72">
             <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
             <input type="text" placeholder="Şifre veya proje ara..." className="glass-input text-sm py-1.5 pl-9 w-full" />
           </div>
           <div className="flex gap-2">
             <button className="px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full">Tümü</button>
             <button className="px-3 py-1 text-xs font-medium text-text-muted hover:text-white transition-colors">Web Sitesi</button>
             <button className="px-3 py-1 text-xs font-medium text-text-muted hover:text-white transition-colors">Sunucu</button>
           </div>
        </div>

        {vaultItems.length === 0 && <div className="p-8 text-center text-text-muted">Henüz şifre bulunmuyor.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {vaultItems.map(item => (
            <div key={item.id} className="bg-surface/50 border border-white/5 rounded-xl p-5 hover:border-white/20 transition-colors group relative">
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => deleteVaultItem(item.id)} className="p-1.5 text-red-400 hover:bg-white/10 rounded-md">
                   <Trash2 className="w-4 h-4" />
                 </button>
              </div>
              <div className="flex items-start justify-between mb-4 pr-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{item.category}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {/* URL */}
                <div className="bg-background/50 rounded p-2 flex justify-between items-center group/field">
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">Adres / IP</span>
                    <span className="text-xs text-white truncate block w-48">{item.url}</span>
                  </div>
                  <button onClick={() => copyToClipboard(item.url)} className="text-text-muted hover:text-white opacity-0 group-hover/field:opacity-100 transition-opacity">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Username */}
                <div className="bg-background/50 rounded p-2 flex justify-between items-center group/field">
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">Kullanıcı Adı</span>
                    <span className="text-xs text-white truncate block w-48">{item.username}</span>
                  </div>
                  <button onClick={() => copyToClipboard(item.username)} className="text-text-muted hover:text-white opacity-0 group-hover/field:opacity-100 transition-opacity">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Password */}
                <div className="bg-background/50 rounded p-2 flex justify-between items-center group/field border border-emerald-500/10">
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-0.5">Şifre</span>
                    <span className="text-xs text-white font-mono">
                      {showPassword[item.id] ? item.password : '••••••••••••••••'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => togglePassword(item.id)} className="text-text-muted hover:text-white transition-colors">
                      {showPassword[item.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => copyToClipboard(item.password)} className="text-text-muted hover:text-white opacity-0 group-hover/field:opacity-100 transition-opacity">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Şifre Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Proje / Başlık</label>
            <input required type="text" placeholder="Örn: WordPress Admin Paneli" className="glass-input w-full" value={newVault.title} onChange={e => setNewVault({...newVault, title: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Adres / IP</label>
            <input type="text" className="glass-input w-full" value={newVault.url} onChange={e => setNewVault({...newVault, url: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Kullanıcı Adı</label>
              <input required type="text" className="glass-input w-full" value={newVault.username} onChange={e => setNewVault({...newVault, username: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Şifre</label>
              <input required type="text" className="glass-input w-full" value={newVault.password} onChange={e => setNewVault({...newVault, password: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Kategori</label>
            <select className="glass-input w-full appearance-none" value={newVault.category} onChange={e => setNewVault({...newVault, category: e.target.value})}>
              <option value="Web Sitesi">Web Sitesi</option>
              <option value="Sunucu">Sunucu</option>
              <option value="Sosyal Medya">Sosyal Medya</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost border border-white/10">İptal</button>
            <button type="submit" className="btn-primary">Kaydet</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
