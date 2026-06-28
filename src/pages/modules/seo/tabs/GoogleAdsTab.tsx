import React from 'react';
import { Target, MousePointerClick, Eye, DollarSign } from 'lucide-react';

export const GoogleAdsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Google Ads Entegrasyonu</h2>
          <p className="text-sm text-gray-400">Reklam kampanyaları ve SEO maliyet analizi.</p>
        </div>
        <div className="flex gap-2">
          <select className="glass-input text-sm py-1">
            <option>Son 30 Gün</option>
            <option>Bu Ay</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Harcama', value: '₺0', icon: <DollarSign size={20}/> },
          { label: 'Tıklamalar', value: '0', icon: <MousePointerClick size={20}/> },
          { label: 'Gösterimler', value: '0', icon: <Eye size={20}/> },
          { label: 'Dönüşüm (TBM)', value: '-', icon: <Target size={20}/> },
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

      <div className="glass-panel p-8 text-center mt-6">
        <Target className="mx-auto mb-4 text-blue-500 opacity-50" size={48} />
        <h3 className="text-lg font-medium text-white mb-2">Google Ads API Bağlantısı Bekleniyor</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          Kampanya detaylarını, anahtar kelime bazlı maliyetleri ve SEO ile çakışan reklamları görmek için API'yi bağlayın.
        </p>
        <button className="btn-outline mx-auto">OAuth ile Bağlan</button>
      </div>
    </div>
  );
};
