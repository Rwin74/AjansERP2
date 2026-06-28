import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { SeoPrepDashboard } from './pages/modules/seo-prep/SeoPrepDashboard';
import { SeoDashboard } from './pages/modules/seo/SeoDashboard';
import { ErpDashboard } from './pages/modules/erp/ErpDashboard';
import { SettingsDashboard } from './pages/modules/settings/SettingsDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect to SEO Hazırlık */}
          <Route index element={<Navigate to="/seo-hazirlik" replace />} />
          
          {/* Main Modules */}
          <Route path="seo-hazirlik/*" element={<SeoPrepDashboard />} />
          <Route path="seo/*" element={<SeoDashboard />} />
          <Route path="erp/*" element={<ErpDashboard />} />
          <Route path="settings/*" element={<SettingsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
