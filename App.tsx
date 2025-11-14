
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Layout } from './components/layout/Layout';
import { Dashboard, Attendance, Stock, Prediction, Deliveries, VehicleTracking, TVMode, Settings } from './pages';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import { UserRole } from './types';

// Theme Context
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (storedPrefs === 'dark' || storedPrefs === 'light') {
        return storedPrefs;
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Auth Context
type AuthContextType = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [role, setRoleState] = useState<UserRole>(() => {
        return (localStorage.getItem('userRole') as UserRole) || UserRole.None;
    });

    const setRole = (newRole: UserRole) => {
        localStorage.setItem('userRole', newRole);
        setRoleState(newRole);
    };
    
    const logout = () => {
        localStorage.removeItem('userRole');
        setRoleState(UserRole.None);
        navigate('/');
    };

    const value = useMemo(() => ({ role, setRole, logout }), [role]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};


// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: UserRole[] }> = ({ children, allowedRoles }) => {
    const { role } = useAuth();
    const location = useLocation();

    if (role === UserRole.None) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const AppRoutes = () => {
    const location = useLocation();
    const { role } = useAuth();
    
    if (role === UserRole.None) {
      return (
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }

    return (
      <Layout>
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/dashboard" element={<ProtectedRoute allowedRoles={[UserRole.Manager, UserRole.Admin]}><Dashboard /></ProtectedRoute>} />
                <Route path="/attendance" element={<ProtectedRoute allowedRoles={[UserRole.Manager, UserRole.Admin]}><Attendance /></ProtectedRoute>} />
                <Route path="/stock" element={<ProtectedRoute allowedRoles={[UserRole.Manager, UserRole.Admin]}><Stock /></ProtectedRoute>} />
                <Route path="/prediction" element={<ProtectedRoute allowedRoles={[UserRole.Manager, UserRole.Admin]}><Prediction /></ProtectedRoute>} />
                <Route path="/deliveries" element={<ProtectedRoute allowedRoles={[UserRole.Manager, UserRole.Admin]}><Deliveries /></ProtectedRoute>} />
                <Route path="/vehicle-tracking" element={<ProtectedRoute allowedRoles={[UserRole.Manager, UserRole.Admin]}><VehicleTracking /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute allowedRoles={[UserRole.Admin]}><Settings /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </AnimatePresence>
      </Layout>
    );
}


const App = () => {
  return (
    <ThemeProvider>
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="/tv-mode" element={<TVMode />} />
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </AuthProvider>
        </HashRouter>
    </ThemeProvider>
  );
};

export default App;
