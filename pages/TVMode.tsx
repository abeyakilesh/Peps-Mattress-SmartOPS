import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DataContext } from '../context/DataContext';
import DigitalClock from '../components/DigitalClock';
import ScrollingTicker from '../components/ScrollingTicker';
import { GanttChartSquare } from 'lucide-react';
// FIX: Import XAxis and YAxis from recharts.
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis } from 'recharts';
import CircularProgress from '../components/CircularProgress';
import type { KPI, StockItem } from '../types';

const TVMode: React.FC = () => {
  const { kpis, stock, deliveries, attendance, loading, setRole } = useContext(DataContext);
  
  // A simple way to trigger a re-fetch or re-simulation in useMockData
  // In a real app, this would be a dedicated function in the context.
  const refreshData = () => {
    console.log("Refreshing data for TV Mode...");
    // This is a bit of a hack for mock data. A real API would have a refetch function.
    window.location.reload(); 
  };
  
  // Set a default role if none is set, to enable data loading
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (!savedRole) {
      setRole('Executive');
    }
    
    const interval = setInterval(refreshData, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
      return (
          <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
              <GanttChartSquare className="h-16 w-16 text-blue-500 animate-pulse" />
              <h1 className="text-4xl font-bold mt-4">SmartOps</h1>
              <p className="text-xl mt-2 text-gray-400">Loading Operations Data...</p>
          </div>
      )
  }
  
  const stockChartData = stock.map(item => ({...item, percentage: (item.quantity / item.capacity) * 100}));
  const onTimeDeliveries = deliveries.filter(d => d.status === 'Delivered').length;
  const deliverySuccessRate = deliveries.length > 0 ? (onTimeDeliveries / deliveries.length) * 100 : 0;
  const latestAttendance = attendance.length > 0 ? attendance[attendance.length-1] : {present: 0, absent: 0};
  const attendanceRate = latestAttendance.present + latestAttendance.absent > 0 ? (latestAttendance.present / (latestAttendance.present + latestAttendance.absent)) * 100 : 0;

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center">
            <GanttChartSquare className="h-10 w-10 text-blue-500" />
            <h1 className="text-3xl font-bold ml-3">SmartOps Live Dashboard</h1>
        </div>
        <DigitalClock className="text-right" />
      </header>
      
      {/* Main Content */}
      <main className="flex-1 grid grid-cols-4 grid-rows-3 gap-4 p-4">
        {kpis.map((kpi, index) => (
          <TVKpiCard key={index} kpi={kpi} />
        ))}

        <div className="col-span-2 row-span-2 bg-gray-900/80 p-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-300">Stock Sufficiency</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockChartData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" stroke="#d1d5db" width={80} tick={{ fontSize: 14 }} />
                    <Bar dataKey="percentage" barSize={25} radius={[0, 10, 10, 0]}>
                       {stockChartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.sufficiency === 'High' ? '#22c55e' : entry.sufficiency === 'Medium' ? '#f59e0b' : '#ef4444'} />
                       ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

         <div className="bg-gray-900/80 p-4 rounded-lg flex flex-col items-center justify-center text-center">
             <h2 className="text-xl font-semibold mb-2 text-gray-300">Delivery Success</h2>
             <CircularProgress 
                percentage={deliverySuccessRate} 
                color="stroke-green-400" 
                size={150} 
                strokeWidth={12}
                trackColor="text-gray-700"
                textColor="text-gray-100"
              />
        </div>
        <div className="bg-gray-900/80 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold mb-2 text-gray-300">Attendance Rate</h2>
             <CircularProgress 
                percentage={attendanceRate} 
                color="stroke-blue-400" 
                size={150} 
                strokeWidth={12}
                trackColor="text-gray-700"
                textColor="text-gray-100"
              />
        </div>
      </main>

      {/* Footer Ticker */}
      <footer className="w-full">
        <ScrollingTicker stock={stock} deliveries={deliveries} />
      </footer>
    </div>
  );
};

const TVKpiCard: React.FC<{kpi: KPI}> = ({ kpi }) => (
    <motion.div 
        className="bg-gray-900/80 p-4 rounded-lg flex flex-col justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-400">{kpi.title}</h3>
            <kpi.icon className="h-7 w-7 text-gray-500" />
        </div>
        <div>
            <p className="text-5xl font-bold">{kpi.value}</p>
            <p className={`text-lg font-semibold ${kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change}
            </p>
        </div>
    </motion.div>
);

export default TVMode;