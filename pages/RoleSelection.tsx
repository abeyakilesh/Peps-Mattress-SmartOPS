import React, { useContext } from 'react';
// FIX: Import 'Variants' type from framer-motion to correctly type animation variants.
import { motion, type Variants } from 'framer-motion';
import { User, Briefcase, UserCheck } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import type { UserRole } from '../types';
import NetworkBackground from '../components/NetworkBackground';
import { GanttChartSquare } from 'lucide-react';

const roles: { name: UserRole; icon: React.ElementType; description: string }[] = [
  { name: 'Manager', icon: Briefcase, description: 'Full access to all data, analytics, and settings.' },
  { name: 'Operator', icon: User, description: 'View stock, deliveries, and tracking information.' },
  { name: 'Executive', icon: UserCheck, description: 'High-level dashboard and TV mode access.' },
];

const RoleSelection: React.FC = () => {
  const { setRole } = useContext(DataContext);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <NetworkBackground className="min-h-screen flex flex-col items-center justify-center p-4">
       <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
                <GanttChartSquare className="h-12 w-12 text-blue-500" />
                <h1 className="text-5xl font-bold ml-3 text-black">SmartOps</h1>
            </div>
            <p className="text-xl text-gray-800">Select your role to begin</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {roles.map((role, i) => (
          <motion.div
            key={role.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => setRole(role.name)}
            className="cursor-pointer bg-white/60 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-200 text-center transition-all"
          >
            <role.icon className="h-16 w-16 mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-black">{role.name}</h2>
            <p className="text-gray-800">{role.description}</p>
          </motion.div>
        ))}
      </div>
    </NetworkBackground>
  );
};

export default RoleSelection;