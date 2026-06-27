import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Save
} from 'lucide-react';
import { clsx } from 'clsx';

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Ayarlar</h1>
          <p className="text-sm text-text-muted mt-1">Sistem tercihlerinizi ve kullanıcı profillerini yönetin.</p>
        </div>
        <button className="btn-primary">
          <Save className="w-5 h-5" />
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-1">
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium text-sm transition-colors text-left">
             <User className="w-4 h-4" /> Profil
           </button>
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-white/5 hover:text-white font-medium text-sm transition-colors text-left">
             <Palette className="w-4 h-4" /> Görünüm
           </button>
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-white/5 hover:text-white font-medium text-sm transition-colors text-left">
             <Bell className="w-4 h-4" /> Bildirimler
           </button>
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-white/5 hover:text-white font-medium text-sm transition-colors text-left">
             <Shield className="w-4 h-4" /> Güvenlik
           </button>
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-white/5 hover:text-white font-medium text-sm transition-colors text-left mt-4 border border-white/5 bg-surface/50">
             <Database className="w-4 h-4" /> Veritabanı
           </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
           <div className="glass-panel p-6">
             <h3 className="text-lg font-semibold text-white mb-6">Profil Bilgileri</h3>
             
             <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-primary/20 text-2xl font-bold text-white border-2 border-surface">
                 U
               </div>
               <div>
                 <button className="btn-ghost border border-white/10 text-xs mb-2">Fotoğraf Değiştir</button>
                 <p className="text-xs text-text-muted">JPG, GIF veya PNG. Max 1MB.</p>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Ad Soyad</label>
                 <input type="text" defaultValue="Admin User" className="glass-input w-full" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">E-Posta Adresi</label>
                 <input type="email" defaultValue="admin@ajans.com" className="glass-input w-full" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Ünvan / Rol</label>
                 <input type="text" defaultValue="Ajans Yöneticisi" className="glass-input w-full" disabled />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Saat Dilimi</label>
                 <select className="glass-input w-full appearance-none">
                   <option>(GMT+03:00) Istanbul</option>
                 </select>
               </div>
             </div>
           </div>

           <div className="glass-panel p-6">
             <h3 className="text-lg font-semibold text-white mb-6">Ajans Ayarları</h3>
             <div className="grid grid-cols-1 gap-6">
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Ajans (Firma) Adı</label>
                 <input type="text" defaultValue="Modern Ajans" className="glass-input w-full" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Varsayılan Para Birimi</label>
                 <select className="glass-input w-full appearance-none">
                   <option>TRY (₺)</option>
                   <option>USD ($)</option>
                   <option>EUR (€)</option>
                 </select>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
