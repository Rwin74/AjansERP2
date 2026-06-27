import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { CRM } from './pages/CRM';
import { FirmDetail } from './pages/FirmDetail';
import { Jobs } from './pages/Jobs';
import { Finance } from './pages/Finance';
import { Proposals } from './pages/Proposals';
import { Domains } from './pages/Domains';
import { Hosting } from './pages/Hosting';
import { Vault } from './pages/Vault';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="crm" element={<CRM />} />
          <Route path="crm/:id" element={<FirmDetail />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="finance" element={<Finance />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="domains" element={<Domains />} />
          <Route path="hosting" element={<Hosting />} />
          <Route path="vault" element={<Vault />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
