import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

export const ActiveJobsTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Aktif İşler & Görevler</h2>
        <p className="text-sm text-gray-400">Ajans içi görev takibi.</p>
      </div>
      <button className="btn-primary">Yeni Görev</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-panel p-4 h-[500px] flex flex-col">
        <h3 className="font-semibold mb-4 text-gray-300 border-b border-white/5 pb-2">Yapılacaklar (To Do)</h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {/* Boş Durum */}
          <div className="text-center py-8 text-gray-500 text-sm">Görev bulunamadı</div>
        </div>
      </div>
      
      <div className="glass-panel p-4 h-[500px] flex flex-col">
        <h3 className="font-semibold mb-4 text-blue-400 border-b border-blue-500/20 pb-2">Devam Edenler (In Progress)</h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {/* Boş Durum */}
          <div className="text-center py-8 text-gray-500 text-sm">Görev bulunamadı</div>
        </div>
      </div>

      <div className="glass-panel p-4 h-[500px] flex flex-col">
        <h3 className="font-semibold mb-4 text-green-400 border-b border-green-500/20 pb-2">Tamamlananlar (Done)</h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {/* Boş Durum */}
          <div className="text-center py-8 text-gray-500 text-sm">Görev bulunamadı</div>
        </div>
      </div>
    </div>
  </div>
);
