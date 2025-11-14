import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import VehicleMap from '../components/VehicleMap';
import { cn } from '../lib/utils';
import type { Vehicle } from '../types';

const VehicleTracking: React.FC = () => {
    const { vehicles, loading } = useContext(DataContext);

    if (loading || !vehicles) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            </div>
        );
    }
    
    const statusColors: Record<Vehicle['status'] | 'Maintenance', string> = {
        'In Transit': 'bg-blue-500',
        'Idle': 'bg-green-500',
        'Maintenance': 'bg-yellow-500',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Map Display (Left Column) */}
            <motion.div 
                className="lg:col-span-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <VehicleMap vehicles={vehicles} />
            </motion.div>

            {/* Vehicle List (Right Column) */}
            <motion.div 
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-y-auto"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h2 className="text-xl font-bold mb-4 text-black dark:text-gray-200">Vehicles</h2>
                <ul className="space-y-3">
                    {vehicles.map((vehicle) => (
                        <li key={vehicle.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-bold text-black dark:text-white">{vehicle.id}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-400">{vehicle.type}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className={cn(
                                    "h-2.5 w-2.5 rounded-full",
                                    statusColors[vehicle.status] || 'bg-gray-400'
                                )}></div>
                                <span className="text-sm font-medium text-black dark:text-gray-300">{vehicle.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default VehicleTracking;