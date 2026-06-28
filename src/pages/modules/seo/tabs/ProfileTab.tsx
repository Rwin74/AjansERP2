import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import { Building, Globe, Server, Cloud, MonitorDot, UploadCloud, GitBranch, Box, Search, BarChart2, Target, MapPin, Tag, Share2, Mail, Key, ShieldCheck, Edit2, Save, X } from 'lucide-react';
import { CATEGORIES } from '../../../../constants/prepCategories';

export const ProfileTab = () => {
  const { clients, activeClientId, updateClient } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Record<string, Record<string, string>>>({});

  if (!activeClient) return null;

  const data = activeClient.prepData || {};

  const handleEditStart = () => {
    setEditData(JSON.parse(JSON.stringify(data)));
    setIsEditing(true);
  };

  const handleSave = () => {
    updateClient(activeClient.id, { prepData: editData });
    setIsEditing(false);
  };

  const updateField = (catId: string, field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [catId]: {
        ...(prev[catId] || {}),
        [field]: value
      }
    }));
  };

  const getCategoryIcon = (key: string) => {
    const cat = CATEGORIES.find(c => c.id === key);
    if (cat) return cat.icon;
    return <ShieldCheck size={18} className="text-gray-400" />;
  };

  const getCategoryTitle = (key: string) => {
    const cat = CATEGORIES.find(c => c.id === key);
    return cat ? cat.title : key.toUpperCase();
  };

  const categoriesWithData = Object.entries(data).filter(([_, fields]) => {
    return Object.values(fields as Record<string, string>).some(val => val.trim() !== '');
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-white/5 pb-6 gap-4 md:gap-0">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-white">{activeClient.name} - Müşteri Dosyası</h2>
          <p className="text-sm text-gray-400">Kurulum sırasında girilen tüm veriler, erişim bilgileri ve şifreler.</p>
        </div>
        
        {isEditing ? (
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="btn-secondary flex items-center gap-2">
              <X size={16} /> İptal
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save size={16} /> Kaydet
            </button>
          </div>
        ) : (
          <button onClick={handleEditStart} className="btn-primary flex items-center gap-2">
            <Edit2 size={16} /> Bilgileri Düzenle
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-3 rounded-lg text-sm mb-6">
            Şu an düzenleme modundasınız. Sadece doldurduğunuz alanlar "Müşteri Dosyası" önizlemesinde görünür.
          </div>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="glass-panel overflow-hidden">
              <div className="p-4 bg-black/40 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg">{cat.title}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.fields.map((field) => {
                  const isSelect = field.includes('Durum') || field.includes('mı');
                  const isTextarea = field.includes('Notlar') || field.includes('Sektör');
                  const val = editData[cat.id]?.[field] || '';

                  return (
                    <div key={field} className={isTextarea ? 'md:col-span-2 lg:col-span-3' : ''}>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        {field}
                      </label>
                      {isSelect ? (
                        <select 
                          className="glass-input w-full text-sm py-2"
                          value={val}
                          onChange={(e) => updateField(cat.id, field, e.target.value)}
                        >
                          <option value="">Seçiniz...</option>
                          <option value="Evet">Evet</option>
                          <option value="Hayır">Hayır</option>
                          <option value="Beklemede">Beklemede</option>
                        </select>
                      ) : isTextarea ? (
                        <textarea 
                          className="glass-input w-full text-sm py-2 min-h-[80px]"
                          placeholder={`${field} giriniz...`}
                          value={val}
                          onChange={(e) => updateField(cat.id, field, e.target.value)}
                        />
                      ) : (
                        <input 
                          type={field.toLowerCase().includes('şifre') ? 'text' : 'text'}
                          className="glass-input w-full text-sm py-2"
                          placeholder={`${field} giriniz...`}
                          value={val}
                          onChange={(e) => updateField(cat.id, field, e.target.value)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : categoriesWithData.length === 0 ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Building size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Veri Bulunamadı</h3>
          <p className="text-gray-400 max-w-md">
            Bu müşteri için kaydedilmiş herhangi bir kurulum (SEO Hazırlık) verisi bulunmuyor. "Bilgileri Düzenle" butonuna tıklayarak ekleme yapabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categoriesWithData.map(([categoryKey, fields]) => (
            <div key={categoryKey} className="glass-panel p-6 hover:border-white/10 transition-colors">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-3 border-b border-white/5 pb-3">
                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                  {getCategoryIcon(categoryKey)}
                </div>
                {getCategoryTitle(categoryKey)}
              </h3>
              <div className="space-y-3">
                {Object.entries(fields as Record<string, string>).map(([fieldName, value]) => {
                  if (!value || value.trim() === '') return null;
                  
                  const isPassword = fieldName.toLowerCase().includes('şifre') || fieldName.toLowerCase().includes('token') || fieldName.toLowerCase().includes('api');
                  
                  return (
                    <div key={fieldName} className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">{fieldName}</p>
                      <p className={`text-sm font-medium ${isPassword ? 'font-mono text-yellow-400 tracking-wider' : 'text-gray-200'} break-words`}>
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
