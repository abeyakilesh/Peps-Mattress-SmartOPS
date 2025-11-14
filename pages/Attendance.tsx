import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import ChartCard from '../components/ChartCard';
import CircularProgress from '../components/CircularProgress';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, LabelList } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Attendance: React.FC = () => {
  const { attendance, loading } = useContext(DataContext);

  if (loading) {
    return <AttendanceSkeleton />;
  }

  const latestAttendance = attendance.length > 0 ? attendance[attendance.length - 1] : null;

  const attendanceTrendData = attendance.map(day => ({
    name: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Present: day.present,
    Absent: day.absent,
  }));

  const genderData = latestAttendance ? [
    { name: 'Male', value: latestAttendance.genderBreakdown.male },
    { name: 'Female', value: latestAttendance.genderBreakdown.female },
  ] : [];

  const ageData = latestAttendance ? [
    { name: '<25', value: latestAttendance.ageGroups['<25'] },
    { name: '25-40', value: latestAttendance.ageGroups['25-40'] },
    { name: '>40', value: latestAttendance.ageGroups['>40'] },
  ] : [];

  const attendanceRate = latestAttendance ? (latestAttendance.present / (latestAttendance.present + latestAttendance.absent)) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>As of {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <CircularProgress percentage={attendanceRate} color="stroke-blue-500" />
            <div className="mt-4 text-center">
                <p className="text-2xl font-bold">{latestAttendance?.present}</p>
                <p className="text-sm text-gray-500">Present</p>
            </div>
             <div className="mt-2 text-center">
                <p className="text-lg font-bold text-red-500">{latestAttendance?.absent}</p>
                <p className="text-xs text-gray-500">Absent</p>
            </div>
          </CardContent>
        </Card>
        <ChartCard title="Attendance Trend (Last 7 Days)" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrendData}>
                     <XAxis dataKey="name" stroke="#374151" fontSize={12} />
                    <YAxis stroke="#374151" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e5e7eb' }}/>
                    <Legend />
                    <Bar dataKey="Present" stackId="a" fill="#2563eb" />
                    <Bar dataKey="Absent" stackId="a" fill="#ef4444" />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Gender Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Age Group Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData}>
              <XAxis dataKey="name" stroke="#374151" fontSize={12} />
              <YAxis stroke="#374151" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#e5e7eb' }}/>
              <Bar dataKey="value" fill="#8884d8">
                <LabelList dataKey="value" position="top" style={{ fill: '#374151', fontSize: 12 }} />
                {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

const AttendanceSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <Skeleton className="h-8 w-16 mt-4" />
                    <Skeleton className="h-4 w-12 mt-1" />
                    <Skeleton className="h-6 w-14 mt-2" />
                    <Skeleton className="h-3 w-10 mt-1" />
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader>
                <CardContent><Skeleton className="h-64 w-full" /></CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <Card>
                <CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader>
                <CardContent><Skeleton className="h-64 w-full" /></CardContent>
             </Card>
             <Card>
                <CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader>
                <CardContent><Skeleton className="h-64 w-full" /></CardContent>
             </Card>
        </div>
    </div>
);


export default Attendance;