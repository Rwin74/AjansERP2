import React from 'react';
import { MapPin, Star, MessageCircle, Phone, Navigation, Image as ImageIcon } from 'lucide-react';

export const GoogleBusinessTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Google İşletme Profili (GMB)</h2>
          <p className="text-sm text-gray-400">Harita etkileşimleri ve yorum yönetimi.</p>
        </div>
        <button className="btn-primary">Yeni Gönderi Paylaş</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Star />, label: 'Ortalama Puan', value: '-', sub: 'Veri yok' },
          { icon: <MessageCircle />, label: 'Yeni Yorumlar', value: '0', sub: 'Bu ay' },
          { icon: <Phone />, label: 'Arama Tıklamaları', value: '0', sub: '-' },
          { icon: <Navigation />, label: 'Yol Tarifi', value: '0', sub: '-' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">{stat.icon}</div>
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel overflow-hidden mt-6">
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="font-semibold">Son Yorumlar</h3>
        </div>
        <div className="p-12 text-center text-gray-500">
          Google Business Profile API bağlantısı bekleniyor.
        </div>
      </div>
    </div>
  );
};
