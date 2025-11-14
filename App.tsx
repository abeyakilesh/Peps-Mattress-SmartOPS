
import React, { useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, DataContext } from './context/DataContext';
import Layout from './layout/Layout';
import RoleSelection from './pages/RoleSelection';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Stock from './pages/Stock';
import Prediction from './pages/Prediction';
import Deliveries from './pages/Deliveries';
import VehicleTracking from './pages/VehicleTracking';
import TVMode from './pages/TVMode';
import Settings from './pages/Settings';
import Login from './pages/Login';
import LoadingSpinner from './components/LoadingSpinner';

const AppRoutes: React.FC = () => {
  const { role, loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (!role) {
    return (
      <Routes>
        <Route path="/role" element={<RoleSelection />} />
        <Route path="*" element={<Navigate to="/role" />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/tracking" element={<VehicleTracking />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route path="/tv-mode" element={<TVMode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
};

export default App;