import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  GanttChartSquare,
  Truck,
  Map,
  Settings,
  Tv,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { DataContext } from '../context/DataContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['Manager', 'Operator', 'Executive'] },
  { icon: Users, label: 'Attendance', path: '/attendance', roles: ['Manager'] },
  { icon: Package, label: 'Stock', path: '/stock', roles: ['Manager', 'Operator'] },
  { icon: GanttChartSquare, label: 'Prediction', path: '/prediction', roles: ['Manager'] },
  { icon: Truck, label: 'Deliveries', path: '/deliveries', roles: ['Manager', 'Operator'] },
  { icon: Map, label: 'Tracking', path: '/tracking', roles: ['Manager', 'Operator'] },
  { icon: Tv, label: 'TV Mode', path: '/tv-mode', roles: ['Manager', 'Operator', 'Executive'] },
];

const settingsItem = { icon: Settings, label: 'Settings', path: '/settings', roles: ['Manager', 'Operator', 'Executive'] };

const NavItem: React.FC<{item: typeof navItems[0]}> = ({ item }) => {
    const location = useLocation();
    const isActive = location.pathname === item.path;

    return (
        <NavLink
            to={item.path}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
            ${isActive
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-black'
            }`}
        >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
        </NavLink>
    );
};

const Sidebar: React.FC = () => {
    const { role, setRole } = useContext(DataContext);

    const filteredNavItems = navItems.filter(item => item.roles.includes(role!));

    return (
        <div className="w-64 bg-white text-gray-800 flex flex-col border-r border-gray-200">
            <div className="flex items-center justify-center h-20 border-b border-gray-200">
                 <GanttChartSquare className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold ml-2">SmartOps</h1>
            </div>
            
            <nav className="flex-1 px-4 py-4 space-y-2">
                {filteredNavItems.map(item => <NavItem key={item.path} item={item} />)}
            </nav>

            <div className="px-4 py-4 border-t border-gray-200">
                <NavItem item={settingsItem} />
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-semibold text-black">Operator View</p>
                            <p className="text-xs text-gray-700">{role}</p>
                        </div>
                        <ChevronDown className="w-5 h-5 text-gray-500"/>
                    </div>
                </div>
                 <button
                    onClick={() => setRole(null)}
                    className="w-full flex items-center mt-4 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;