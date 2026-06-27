import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Globe, 
  Server, 
  Settings,
  ShieldAlert
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const menuItems = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/crm', name: 'CRM & Müşteriler', icon: Users },
  { path: '/jobs', name: 'Aktif İşler', icon: Briefcase },
  { path: '/proposals', name: 'Teklifler', icon: FileText },
  { path: '/finance', name: 'Finans', icon: DollarSign },
  { path: '/domains', name: 'Domain', icon: Globe },
  { path: '/hosting', name: 'Hosting', icon: Server },
  { path: '/vault', name: 'Şifre Kasası', icon: ShieldAlert },
  { path: '/settings', name: 'Ayarlar', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen glass-panel rounded-none border-y-0 border-l-0 flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3 text-xl font-bold text-white tracking-wide">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-primary/20">
            A
          </div>
          AjansERP
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 px-2">Menü</div>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                    : 'text-text-muted hover:bg-white/5 hover:text-white'
                )
              )
            }
          >
            <item.icon className={clsx("w-5 h-5", "group-hover:scale-110 transition-transform")} />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary font-bold">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Admin User</span>
            <span className="text-xs text-text-muted">admin@ajans.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
