import React, { useContext } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { DataContext } from '../context/DataContext';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import CircularProgress from '../components/CircularProgress';
import { Skeleton } from '../components/ui/Skeleton';
import type { Delivery } from '../types';

const Dashboard: React.FC = () => {
  const { loading, kpis, attendance, stock, deliveries } = useContext(DataContext);
  
  if (loading) {
    return <DashboardSkeleton />;
  }
  
  const attendanceChartData = attendance.map(day => ({
    name: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    present: day.present,
  }));

  const stockChartData = stock.map(item => ({
      name: item.name.split(' ').slice(0, 2).join(' '),
      quantity: item.quantity
  }));

  const onTimeDeliveries = deliveries.filter(d => d.status === 'Delivered').length;
  const deliverySuccessRate = deliveries.length > 0 ? (onTimeDeliveries / deliveries.length) * 100 : 0;
  
  const recentDeliveries = deliveries.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Attendance Trend (Last 7 Days)">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceChartData}>
                    <defs>
                        <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#374151" fontSize={12} />
                    <YAxis stroke="#374151" fontSize={12} />
                    <Tooltip
                         contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderColor: '#e5e7eb',
                            color: '#1f2937'
                         }}
                    />
                    <Area type="monotone" dataKey="present" stroke="#2563eb" fillOpacity={1} fill="url(#colorPresent)" />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Stock Levels">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockChartData}>
                    <XAxis dataKey="name" stroke="#374151" fontSize={10} interval={0} angle={-30} textAnchor="end" height={60} />
                    <YAxis stroke="#374151" fontSize={12} />
                    <Tooltip
                        contentStyle={{
                           backgroundColor: 'rgba(255, 255, 255, 0.9)',
                           borderColor: '#e5e7eb',
                           color: '#1f2937'
                        }}
                    />
                    <Bar dataKey="quantity" fill="#2563eb" />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Delivery and Production Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentDeliveries.map(d => (
                        <div key={d.id} className="flex items-center text-sm gap-4">
                            <p className="font-medium flex-1 truncate">{d.item} ({d.quantity} units)</p>
                            <p className="text-gray-800 w-20 text-center">{d.vehicleId}</p>
                            <div className="w-24 flex justify-end">
                                <span className={`w-full text-center px-2 py-1 rounded-full text-xs font-semibold
                                    ${d.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                                    ${d.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : ''}
                                    ${d.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${d.status === 'Delayed' ? 'bg-red-100 text-red-800' : ''}
                                `}>{d.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Delivery Success</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                 <CircularProgress percentage={deliverySuccessRate} color="stroke-green-500" />
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-5 w-5 rounded-sm" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-7 w-1/3" />
                        <Skeleton className="h-3 w-1/2 mt-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
             <Card>
                <CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader>
                <CardContent><Skeleton className="h-64 w-full" /></CardContent>
             </Card>
             <Card>
                <CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader>
                <CardContent><Skeleton className="h-64 w-full" /></CardContent>
             </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
             <Card className="lg:col-span-2">
                <CardHeader><Skeleton className="h-5 w-1/4" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </CardContent>
             </Card>
             <Card>
                 <CardHeader><Skeleton className="h-5 w-1/2" /></CardHeader>
                <CardContent className="flex items-center justify-center">
                    <Skeleton className="h-32 w-32 rounded-full" />
                </CardContent>
             </Card>
        </div>
    </div>
);


export default Dashboard;