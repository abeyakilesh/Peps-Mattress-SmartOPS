// Fix: Provide implementation for the RoleSelection page component.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { FactoryIcon } from '../constants';
import { motion } from 'framer-motion';

const RoleSelection = () => {
    const { setRole } = useAuth();
    const navigate = useNavigate();

    const handleRoleSelect = (role: UserRole) => {
        setRole(role);
        navigate('/login');
    };

    const roles = [
        { name: 'Manager', role: UserRole.Manager, description: 'Oversee operations and analytics.' },
        { name: 'Admin', role: UserRole.Admin, description: 'Manage system settings and users.' },
        { name: 'Driver', role: UserRole.Driver, description: 'View deliveries and routes.' }
    ];

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center gap-3 mb-6"
                >
                    <FactoryIcon className="h-12 w-12 text-siemens-teal" />
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-siemens-teal to-zoho-blue">
                        Welcome to SmartOps
                    </h1>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-gray-600 dark:text-gray-300 mb-12"
                >
                    Please select your role to continue
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((roleInfo, index) => (
                        <motion.div
                            key={roleInfo.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                            className="bg-light-card dark:bg-dark-card rounded-xl p-8 cursor-pointer shadow-lg border border-gray-200 dark:border-gray-700"
                            onClick={() => handleRoleSelect(roleInfo.role)}
                        >
                            <h2 className="text-2xl font-semibold mb-2 text-light-text dark:text-dark-text">{roleInfo.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{roleInfo.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
