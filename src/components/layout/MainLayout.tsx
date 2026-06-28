import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Rocket, LineChart, Briefcase, Settings, User } from 'lucide-react';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#000000] text-gray-100 overflow-hidden font-sans">
      {/* Narrow Primary Sidebar (Module Selector) - Bottom on Mobile */}
      <nav className="w-full h-16 md:w-16 md:h-full flex-shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-start py-0 md:py-4 px-4 md:px-0 glass-sidebar z-50 order-last md:order-first border-t border-white/5 md:border-t-0 md:border-r">
        {/* Logo Area */}
        <div 
          onClick={() => {
            window.location.href = '/seo'; 
          }}
          className="hidden md:flex w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center mb-8 shadow-lg cursor-pointer transition-transform hover:scale-105 shrink-0"
        >
          <span className="font-bold text-white text-lg">A</span>
        </div>

        {/* Modules */}
        <div className="flex-1 flex flex-row md:flex-col items-center justify-center md:justify-start gap-4 md:gap-6 mt-0 md:mt-4 w-full">
          <ModuleLink to="/seo-hazirlik" icon={<Rocket size={20} className="md:w-[22px] md:h-[22px]" />} tooltip="SEO Hazırlık" />
          <ModuleLink to="/seo" icon={<LineChart size={20} className="md:w-[22px] md:h-[22px]" />} tooltip="SEO Yönetimi" />
          <ModuleLink to="/erp" icon={<Briefcase size={20} className="md:w-[22px] md:h-[22px]" />} tooltip="ERP & İşletme" />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-row md:flex-col items-center gap-2 md:gap-4 mt-0 md:mt-auto">
          <ModuleLink to="/settings" icon={<Settings size={18} className="md:w-[20px] md:h-[20px]" />} tooltip="Ayarlar" />
          <div className="hidden md:flex w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 items-center justify-center cursor-pointer overflow-hidden shrink-0">
            <User size={20} className="text-gray-400" />
          </div>
        </div>
      </nav>

      {/* Main Content Area (Dynamic based on module) */}
      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] md:h-full overflow-hidden relative z-0">
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
