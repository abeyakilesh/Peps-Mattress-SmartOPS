import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { UserRole, KPI, AttendanceData, StockItem, Delivery, Vehicle, Notification } from '../types';
import { useMockData } from '../hooks/useMockData';

interface DataContextProps {
  loading: boolean;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  kpis: KPI[];
  attendance: AttendanceData[];
  stock: StockItem[];
  deliveries: Delivery[];
  vehicles: Vehicle[];
  notifications: Notification[];
  recalculatePrediction: (workers: number, materialFactor: number) => { prediction: number, confidence: [number, number] };
  addDelivery: (delivery: Omit<Delivery, 'id' | 'status' | 'eta'>) => void;
  updateDeliveryStatus: (deliveryId: string, newStatus: Delivery['status']) => void;
}

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  
  const mockData = useMockData(!!role);

  const handleSetRole = (newRole: UserRole | null) => {
    // In a real app, this would involve auth, etc.
    // For now, we just set it in state and local storage.
    if (newRole) {
        localStorage.setItem('userRole', newRole);
    } else {
        localStorage.removeItem('userRole');
    }
    setRole(newRole);
  }

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (
    <DataContext.Provider value={{ role, setRole: handleSetRole, ...mockData }}>
      {children}
    </DataContext.Provider>
  );
};