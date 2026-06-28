import React from 'react';
import { Crosshair, ShieldAlert } from 'lucide-react';

export const CompetitorsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Rakip Analizi</h2>
          <p className="text-sm text-gray-400">DataForSEO destekli rakip izleme paneli.</p>
        </div>
        <button className="btn-primary">Rakip Ekle</button>
      </div>

      <div className="glass-panel p-12 text-center flex flex-col items-center justify-center">
        <Crosshair size={48} className="text-gray-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Henüz rakip eklenmedi</h3>
        <p className="text-gray-400 mb-6">DataForSEO entegrasyonu ile rakiplerinizin trafik ve backlink verilerini takip edebilirsiniz.</p>
        <button className="btn-primary">İlk Rakibi Ekle</button>
      </div>
    </div>
  );
};
