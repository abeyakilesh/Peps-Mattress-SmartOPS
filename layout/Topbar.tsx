import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import NotificationBell from '../components/NotificationBell';
import { DataContext } from '../context/DataContext';

const pageTitles: { [key: string]: { title: string; subtitle: string } } = {
  '/': { title: 'Dashboard', subtitle: 'Overview of all factory operations.' },
  '/attendance': { title: 'Attendance', subtitle: 'Monitor daily workforce presence.' },
  '/stock': { title: 'Stock Management', subtitle: 'Track raw materials and components.' },
  '/prediction': { title: 'Production Prediction', subtitle: 'Forecast output based on current conditions.' },
  '/deliveries': { title: 'Deliveries', subtitle: 'Manage incoming and outgoing shipments.' },
  '/tracking': { title: 'Vehicle Tracking', subtitle: 'Live map of all delivery vehicles.' },
  '/settings': { title: 'Settings', subtitle: 'Configure your application preferences.' },
};


const Topbar: React.FC = () => {
    const location = useLocation();
    const { role } = useContext(DataContext);
    const pageInfo = pageTitles[location.pathname] || { title: 'SmartOps', subtitle: 'Welcome' };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-6 z-30">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">{pageInfo.title}</h1>
                <p className="text-xs text-gray-700">{pageInfo.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 w-64 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <NotificationBell />
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {role ? role.charAt(0) : 'U'}
                </div>
            </div>
        </header>
    );
};

export default Topbar;