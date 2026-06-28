import React from 'react';
import { Search, Eye, MousePointerClick, TrendingUp } from 'lucide-react';

export const SearchConsoleTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Google Search Console</h2>
          <p className="text-sm text-gray-400">Performans, dizin durumu ve organik arama metrikleri.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Toplam Tıklama', value: '0', icon: <MousePointerClick size={20}/> },
          { label: 'Toplam Gösterim', value: '0', icon: <Eye size={20}/> },
          { label: 'Ortalama CTR', value: '-', icon: <TrendingUp size={20}/> },
          { label: 'Ort. Pozisyon', value: '-', icon: <Search size={20}/> },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 flex flex-col">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              {stat.icon}
              <p className="text-sm">{stat.label}</p>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="glass-panel overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
            <h3 className="font-semibold text-sm text-gray-300">En İyi Sorgular</h3>
          </div>
          <div className="p-12 text-center text-gray-500">
            Search Console API bağlantısı bekleniyor.
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
            <h3 className="font-semibold text-sm text-gray-300">En İyi Sayfalar</h3>
          </div>
          <div className="p-12 text-center text-gray-500">
            Search Console API bağlantısı bekleniyor.
          </div>
        </div>
      </div>
    </div>
  );
};
