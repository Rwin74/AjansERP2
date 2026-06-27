import React from 'react';
import { Search, Bell, Command } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-16 glass-panel rounded-none border-x-0 border-t-0 flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Ara (Firma, Telefon, Not...)" 
            className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-12 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-text-muted font-medium bg-surface px-1.5 py-0.5 rounded border border-white/5">
            <Command className="w-3 h-3" /> K
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/5 text-text-muted hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-surface"></span>
        </button>
      </div>

    </header>
  );
}
