
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../App';
import { NAV_ITEMS, FactoryIcon, LogoutIcon } from '../../constants';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
    const { role, logout } = useAuth();

    const filteredNavItems = NAV_ITEMS.filter(item => item.role.includes(role));

    return (
        <aside className="w-64 bg-light-card dark:bg-dark-card flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-700">
            <div className="h-20 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
                 <div className="flex items-center gap-2">
                    <FactoryIcon className="h-8 w-8 text-siemens-teal" />
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-siemens-teal to-zoho-blue">
                        SmartOps
                    </span>
                </div>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {filteredNavItems.map((item, index) => (
                    <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-siemens-teal dark:hover:text-siemens-teal ${
                                isActive ? 'bg-teal-50 dark:bg-siemens-teal/10 text-siemens-teal font-semibold' : ''
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    </motion.div>
                ))}
            </nav>
            <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                    onClick={logout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-500"
                >
                    <LogoutIcon className="h-5 w-5" />
                    <span>Logout</span>
                </motion.button>
            </div>
        </aside>
    );
};
