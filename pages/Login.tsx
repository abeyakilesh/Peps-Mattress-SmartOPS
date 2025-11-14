// Fix: Provide implementation for the Login page component.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { FactoryIcon } from '../constants';
import { motion } from 'framer-motion';

const Login = () => {
    const { role } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd have actual authentication logic.
        // Here, we just navigate to the dashboard.
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-light-card dark:bg-dark-card p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
            >
                <div className="flex justify-center items-center gap-3 mb-6">
                    <FactoryIcon className="h-10 w-10 text-siemens-teal" />
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-siemens-teal to-zoho-blue">
                        SmartOps Login
                    </h1>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                    Logging in as <span className="font-semibold capitalize text-siemens-teal">{role}</span>
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                defaultValue={role === 'admin' ? 'admin' : 'manager.user'}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-siemens-teal focus:border-siemens-teal sm:text-sm bg-gray-100 dark:bg-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                defaultValue="password"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-siemens-teal focus:border-siemens-teal sm:text-sm bg-gray-100 dark:bg-gray-800"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-siemens-teal focus:ring-siemens-teal border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-siemens-teal hover:text-zoho-blue">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-siemens-teal to-zoho-blue hover:from-siemens-teal/90 hover:to-zoho-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-siemens-teal"
                        >
                            Sign in
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
