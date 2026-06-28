import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Rocket, LineChart, Briefcase, Settings, User } from 'lucide-react';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#000000] text-gray-100 overflow-hidden font-sans">
      {/* Narrow Primary Sidebar (Module Selector) */}
      <nav className="w-16 flex-shrink-0 flex flex-col items-center py-4 glass-sidebar z-50">
        {/* Logo Area */}
        <div 
          onClick={() => {
            window.location.href = '/seo'; // this will trigger a full reload or we can use useNavigate if we refactor. But window.location is fine for a hard reset to global
          }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg cursor-pointer transition-transform hover:scale-105"
        >
          <span className="font-bold text-white text-lg">A</span>
        </div>

        {/* Modules */}
        <div className="flex-1 flex flex-col items-center gap-6 mt-4 w-full">
          <ModuleLink to="/seo-hazirlik" icon={<Rocket size={22} />} tooltip="SEO Hazırlık" />
          <ModuleLink to="/seo" icon={<LineChart size={22} />} tooltip="SEO Yönetimi" />
          <ModuleLink to="/erp" icon={<Briefcase size={22} />} tooltip="ERP & İşletme" />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-4 mt-auto">
          <ModuleLink to="/settings" icon={<Settings size={20} />} tooltip="Ayarlar" />
          <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden">
            <User size={20} className="text-gray-400" />
          </div>
        </div>
      </nav>

      {/* Main Content Area (Dynamic based on module) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-0">
        <Outlet />
      </main>
    </div>
  );
};

// Tooltip logic can be improved later with a proper Radix/Framer tooltip, keeping it simple for now
const ModuleLink = ({ to, icon, tooltip }: { to: string; icon: React.ReactNode; tooltip: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/30' 
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`
      }
    >
      {icon}
      
      {/* Simple Tooltip */}
      <div className="absolute left-14 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-700 z-50 shadow-xl">
        {tooltip}
      </div>
    </NavLink>
  );
};
