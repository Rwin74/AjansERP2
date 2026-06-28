import React from 'react';
import { BarChart2, Users, MousePointerClick, Clock } from 'lucide-react';

export const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Google Analytics 4</h2>
          <p className="text-sm text-gray-400">Kullanıcı davranışı ve dönüşüm metrikleri.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Aktif Kullanıcı', value: '0', icon: <Users size={20}/> },
          { label: 'Oturumlar', value: '0', icon: <MousePointerClick size={20}/> },
          { label: 'Ort. Oturum Süresi', value: '-', icon: <Clock size={20}/> },
          { label: 'Dönüşüm Oranı', value: '-', icon: <BarChart2 size={20}/> },
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
        <BarChart2 className="mx-auto mb-4 text-orange-500 opacity-50" size={48} />
        <h3 className="text-lg font-medium text-white mb-2">GA4 API Bağlantısı Bekleniyor</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
          Kitle demografisi, kaynak analizi ve sayfa bazlı davranış akışını görmek için API'yi bağlayın.
        </p>
        <button className="btn-outline mx-auto">OAuth ile Bağlan</button>
      </div>
    </div>
  );
};
