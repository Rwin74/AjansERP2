import React, { useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  DollarSign, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useStore } from '../store';

export function Dashboard() {
  const { 
    firms, fetchFirms, 
    jobs, fetchJobs, 
    transactions, fetchTransactions,
    domains, fetchDomains,
    hostings, fetchHostings
  } = useStore();

  useEffect(() => {
    fetchFirms();
    fetchJobs();
    fetchTransactions();
    fetchDomains();
    fetchHostings();
  }, [fetchFirms, fetchJobs, fetchTransactions, fetchDomains, fetchHostings]);

  // Calculations
  const activeCustomersCount = firms.length;
  const ongoingJobsCount = jobs.filter(j => j.column_id !== 'completed').length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyIncome = transactions
    .filter(t => {
      if (t.type !== 'gelir') return false;
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const getDaysLeft = (dateString: string) => {
    if (!dateString) return 999;
    const expiry = new Date(dateString);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const upcomingTasks = [...jobs]
    .filter(j => j.column_id !== 'completed' && j.due_date)
    .sort((a, b) => new Date(a.due_date || '').getTime() - new Date(b.due_date || '').getTime())
    .slice(0, 4);

  const upcomingDomains = domains
    .map(d => ({ item: d.name, type: 'Domain', days: getDaysLeft(d.expiry_date) }))
    .filter(d => d.days >= 0 && d.days <= 30);

  const upcomingHostings = hostings
    .map(h => ({ item: h.name, type: 'Hosting', days: getDaysLeft(h.expiry_date) }))
    .filter(h => h.days >= 0 && h.days <= 30);

  const upcomingAlerts = [...upcomingDomains, ...upcomingHostings].sort((a, b) => a.days - b.days).slice(0, 5);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const stats = [
    { title: "Kayıtlı Müşteri", value: activeCustomersCount.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Devam Eden İş", value: ongoingJobsCount.toString(), icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Yaklaşan İş (Teslim)", value: upcomingTasks.length.toString(), icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Aylık Ciro", value: `₺${monthlyIncome.toLocaleString('tr-TR')}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-text-muted mt-1">Sisteme hoş geldiniz, işte bugünün özeti.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 flex items-start justify-between group hover:-translate-y-1 transition-all duration-300">
            <div>
              <p className="text-sm font-medium text-text-muted">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-primary transition-colors">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tasks & Reminders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> Yaklaşan İşler
            </h3>
            <div className="space-y-3">
              {upcomingTasks.length === 0 && <p className="text-sm text-text-muted">Yaklaşan iş bulunmuyor.</p>}
              {upcomingTasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border border-white/20 group-hover:border-primary flex items-center justify-center transition-colors"></div>
                    <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-text-muted">{task.priority}</span>
                    <span className="text-xs text-text-muted w-24 text-right">{task.due_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> Aktif İşler Durumu
            </h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={[
                   { name: 'Pzt', is: 12 },
                   { name: 'Sal', is: 19 },
                   { name: 'Çar', is: 15 },
                   { name: 'Per', is: 22 },
                   { name: 'Cum', is: 28 },
                   { name: 'Cmt', is: 32 },
                   { name: 'Paz', is: 38 },
                 ]} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                   <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#171717', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                   />
                   <Line type="monotone" dataKey="is" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Alerts & Recent */}
        <div className="space-y-6">
          <div className="glass-panel p-6 bg-gradient-to-b from-red-500/10 to-transparent border-t-red-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" /> Yaklaşan Süreler
            </h3>
            <div className="space-y-4">
              {upcomingAlerts.length === 0 && <p className="text-sm text-text-muted">Yaklaşan süre dolumu bulunmuyor.</p>}
              {upcomingAlerts.map((alert, i) => (
                <div key={i} className="flex flex-col gap-1 p-3 rounded-lg bg-surface/50 border border-red-500/20">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-white">{alert.item}</span>
                    <span className="text-xs font-bold text-red-400">{alert.days} Gün Kaldı</span>
                  </div>
                  <span className="text-xs text-text-muted">{alert.type} Yenilemesi</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Son İşlemler</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {recentTransactions.length === 0 && <p className="text-sm text-text-muted">Son işlem bulunmuyor.</p>}
              {recentTransactions.map((trx, i) => (
                <div key={i} className="relative flex items-center justify-between gap-4 p-2 rounded hover:bg-white/5 transition-colors z-10">
                  <div className="flex items-center gap-3">
                     <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border shrink-0 ${trx.type === 'gelir' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                       {trx.type === 'gelir' ? '+' : '-'}
                     </div>
                     <p className="text-sm text-text-muted">
                        <span className="text-white">{trx.title}</span>
                     </p>
                  </div>
                  <span className="text-xs text-text-muted whitespace-nowrap">{trx.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
