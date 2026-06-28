import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { Job } from '../../../../store/useClientStore';
import { Clock, CheckCircle2, Circle, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

export const ActiveJobsTab = () => {
  const { clients, activeClientId, addJob, updateJobStatus, deleteJob } = useClientStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const activeClient = clients.find(c => c.id === activeClientId);
  if (!activeClient) return null;

  const jobs = activeClient.jobs || [];
  const todoJobs = jobs.filter(j => j.status === 'todo');
  const inProgressJobs = jobs.filter(j => j.status === 'in_progress');
  const doneJobs = jobs.filter(j => j.status === 'done');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const job: Job = {
      id: crypto.randomUUID(),
      title: newTitle,
      status: 'todo',
      date: new Date().toLocaleDateString('tr-TR')
    };
    addJob(activeClient.id, job);
    setNewTitle('');
    setIsAdding(false);
  };

  const renderJobCard = (job: Job) => (
    <div key={job.id} className="bg-white/5 border border-white/5 rounded-xl p-4 group relative">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
        {job.status !== 'todo' && (
          <button onClick={() => updateJobStatus(activeClient.id, job.id, job.status === 'done' ? 'in_progress' : 'todo')} className="p-1 hover:bg-white/10 rounded text-gray-400" title="Geri Al">
            <ArrowLeft size={14} />
          </button>
        )}
        {job.status !== 'done' && (
          <button onClick={() => updateJobStatus(activeClient.id, job.id, job.status === 'todo' ? 'in_progress' : 'done')} className="p-1 hover:bg-white/10 rounded text-gray-400" title="İleri Al">
            <ArrowRight size={14} />
          </button>
        )}
        <button onClick={() => { if(window.confirm('Emin misiniz?')) deleteJob(activeClient.id, job.id); }} className="p-1 hover:bg-red-500/20 rounded text-red-400">
          <Trash2 size={14} />
        </button>
      </div>
      <p className="font-medium text-sm text-gray-200 pr-16">{job.title}</p>
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <Clock size={12} /> {job.date}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Aktif İşler & Görevler</h2>
          <p className="text-sm text-gray-400">Ajans içi görev takibi.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Yeni Görev
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-panel p-4 mb-6 flex items-end gap-4 border border-blue-500/30">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-400 mb-1">Görev Adı</label>
            <input 
              type="text" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="glass-input w-full"
              placeholder="Örn: Footer tasarımı revize edilecek"
              autoFocus
            />
          </div>
          <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">İptal</button>
          <button onClick={handleAdd} className="btn-primary py-2 px-6">Ekle</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-4 min-h-[500px] flex flex-col bg-white/[0.01]">
          <h3 className="font-semibold mb-4 text-gray-300 border-b border-white/5 pb-2 flex justify-between">
            <span>Yapılacaklar</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{todoJobs.length}</span>
          </h3>
          <div className="flex-1 space-y-3">
            {todoJobs.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">Görev bulunamadı</div>
            ) : (
              todoJobs.map(renderJobCard)
            )}
          </div>
        </div>
        
        <div className="glass-panel p-4 min-h-[500px] flex flex-col bg-blue-500/[0.02] border border-blue-500/10">
          <h3 className="font-semibold mb-4 text-blue-400 border-b border-blue-500/20 pb-2 flex justify-between">
            <span>Devam Edenler</span>
            <span className="bg-blue-500/20 px-2 py-0.5 rounded text-xs text-blue-300">{inProgressJobs.length}</span>
          </h3>
          <div className="flex-1 space-y-3">
            {inProgressJobs.length === 0 ? (
              <div className="text-center py-8 text-blue-500/40 text-sm">Görev bulunamadı</div>
            ) : (
              inProgressJobs.map(renderJobCard)
            )}
          </div>
        </div>

        <div className="glass-panel p-4 min-h-[500px] flex flex-col bg-green-500/[0.02] border border-green-500/10">
          <h3 className="font-semibold mb-4 text-green-400 border-b border-green-500/20 pb-2 flex justify-between">
            <span>Tamamlananlar</span>
            <span className="bg-green-500/20 px-2 py-0.5 rounded text-xs text-green-300">{doneJobs.length}</span>
          </h3>
          <div className="flex-1 space-y-3">
            {doneJobs.length === 0 ? (
              <div className="text-center py-8 text-green-500/40 text-sm">Görev bulunamadı</div>
            ) : (
              doneJobs.map(renderJobCard)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
