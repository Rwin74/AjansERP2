import React from 'react';
import { Link2, ExternalLink, ShieldAlert } from 'lucide-react';

export const BacklinkTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Backlink Analizi</h2>
          <p className="text-sm text-gray-400">Zararlı link takibi ve yeni kazanılan bağlantılar.</p>
        </div>
        <button className="btn-primary">Ahrefs/Moz Entegrasyonu</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Toplam Backlink', value: '0', sub: 'Veri bekleniyor' },
          { label: 'Referring Domains', value: '0', sub: 'Veri bekleniyor' },
          { label: 'Spam Skoru (Ort)', value: '-', sub: 'Veri bekleniyor' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6">
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel overflow-hidden mt-6">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h3 className="font-semibold">Son Kazanılan Backlinkler</h3>
        </div>
        <div className="p-12 text-center text-gray-500">
          Ahrefs veya Moz entegrasyonu sağlandığında backlink verileri burada listelenecektir.
        </div>
      </div>
    </div>
  );
};
