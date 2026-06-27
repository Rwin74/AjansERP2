import React, { useState, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Calendar, 
  Paperclip, 
  MessageSquare,
  Clock,
  Plus,
  Trash2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

// Kanban Columns
const COLUMNS = [
  { id: 'new', title: 'Yeni İş', color: 'bg-blue-500' },
  { id: 'ongoing', title: 'Devam Ediyor', color: 'bg-indigo-500' },
  { id: 'review', title: 'Müşteri Onayı', color: 'bg-amber-500' },
  { id: 'completed', title: 'Tamamlandı', color: 'bg-emerald-500' }
];

const priorityColors: Record<string, string> = {
  'Acil': 'bg-red-500/10 text-red-500 border-red-500/20',
  'Yüksek': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Normal': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
};

export function Jobs() {
  const { jobs, fetchJobs, addJob, updateJobColumn, deleteJob, firms, fetchFirms } = useStore();
  const [draggedJobId, setDraggedJobId] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', firm_id: '', budget: '', due_date: '', priority: 'Normal' });

  useEffect(() => {
    fetchJobs();
    fetchFirms(); // Need firms for the select dropdown
  }, [fetchJobs, fetchFirms]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedJobId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (draggedJobId) {
      await updateJobColumn(draggedJobId, columnId);
      setDraggedJobId(null);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.firm_id) {
      alert("Lütfen bir firma seçin.");
      return;
    }
    await addJob(newJob);
    setIsModalOpen(false);
    setNewJob({ title: '', firm_id: '', budget: '', due_date: '', priority: 'Normal' });
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Aktif İşler</h1>
          <p className="text-sm text-text-muted mt-1">Projelerinizi Kanban panosunda yönetin. Sürükle bırak yapabilirsiniz.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" />
            Yeni Görev
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {COLUMNS.map(column => {
            const columnJobs = jobs.filter(j => j.column_id === column.id);
            
            return (
              <div 
                key={column.id}
                className="w-80 flex flex-col glass-panel border border-white/5"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-surface/30 shrink-0 rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    <h3 className="font-semibold text-white">{column.title}</h3>
                    <span className="text-xs font-medium text-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                      {columnJobs.length}
                    </span>
                  </div>
                  <button className="text-text-muted hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Column Body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {columnJobs.map(job => (
                    <div
                      key={job.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, job.id)}
                      className={clsx(
                        "bg-surface/80 p-4 rounded-xl border border-white/10 shadow-lg cursor-grab active:cursor-grabbing hover:border-primary/50 transition-all group",
                        draggedJobId === job.id && "opacity-50 scale-95"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={clsx("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border", priorityColors[job.priority] || priorityColors['Normal'])}>
                          {job.priority}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => deleteJob(job.id)} className="text-red-400 hover:text-red-300 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-medium text-white text-sm mb-1 leading-snug">{job.title}</h4>
                      <p className="text-xs text-text-muted mb-4">{job.firms?.name || 'Bilinmeyen Firma'}</p>

                      {/* Progress Bar */}
                      {(job.progress || 0) > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-[10px] text-text-muted mb-1 font-medium">
                            <span>İlerleme</span>
                            <span>%{job.progress}</span>
                          </div>
                          <div className="w-full bg-background rounded-full h-1.5 border border-white/5 overflow-hidden">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-3">
                           <div className="flex items-center gap-1 text-text-muted text-xs font-medium">
                             <MessageSquare className="w-3.5 h-3.5" /> 0
                           </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-text-muted text-xs font-medium">
                            <Clock className="w-3.5 h-3.5" /> {job.due_date || '-'}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                            A
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Drop zone placeholder if empty */}
                  {columnJobs.length === 0 && (
                    <div className="h-24 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-sm text-text-muted">
                      Sürükle & Bırak
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Görev Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Görev Adı</label>
            <input required type="text" className="glass-input w-full" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Müşteri / Firma</label>
            <select required className="glass-input w-full appearance-none" value={newJob.firm_id} onChange={e => setNewJob({...newJob, firm_id: e.target.value})}>
              <option value="">Firma Seçin...</option>
              {firms.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Bütçe</label>
              <input type="text" className="glass-input w-full" value={newJob.budget} onChange={e => setNewJob({...newJob, budget: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Teslim Tarihi</label>
              <input type="text" placeholder="Örn: 15 Tem 2026" className="glass-input w-full" value={newJob.due_date} onChange={e => setNewJob({...newJob, due_date: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Öncelik</label>
            <select className="glass-input w-full appearance-none" value={newJob.priority} onChange={e => setNewJob({...newJob, priority: e.target.value})}>
              <option value="Normal">Normal</option>
              <option value="Yüksek">Yüksek</option>
              <option value="Acil">Acil</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost border border-white/10">İptal</button>
            <button type="submit" className="btn-primary">Kaydet</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
