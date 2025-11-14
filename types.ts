export type UserRole = 'Manager' | 'Operator' | 'Executive';

export interface KPI {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  ageGroups: {
    '<25': number;
    '25-40': number;
    '>40': number;
  };
  genderBreakdown: {
    male: number;
    female: number;
  };
}

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  capacity: number;
  sufficiency: 'High' | 'Medium' | 'Low';
}

export interface Delivery {
  id: string;
  vehicleId: string;
  item: string;
  quantity: number;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Delayed';
  eta: string; 
}

export interface Vehicle {
    id: string;
    type: 'Truck' | 'Van';
    status: 'Idle' | 'In Transit';
    location: [number, number]; // [lat, lng]
}

export interface Notification {
  id: number;
  message: string;
  type: 'alert' | 'info' | 'success';
  timestamp: string;
}