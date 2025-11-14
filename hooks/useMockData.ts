// Fix: Provide implementation for the mock data hook.
import { useMemo } from 'react';

// This is a placeholder hook for providing mock data throughout the application.
// In a real application, this would be replaced with actual data fetching logic (e.g., from an API).

export const useMockData = () => {
    const dashboardStats = useMemo(() => [
        { name: 'Production Output', value: '1,250 units', change: '+5.2%', changeType: 'increase' },
        { name: 'Efficiency', value: '92.8%', change: '-0.5%', changeType: 'decrease' },
        { name: 'Downtime', value: '1.2 hours', change: '+15%', changeType: 'decrease' }, // increase in downtime is bad
        { name: 'On-time Deliveries', value: '98.5%', change: '+1.0%', changeType: 'increase' },
    ], []);

    const productionChartData = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            name: new Date(0, i).toLocaleString('default', { month: 'short' }),
            'Actual': Math.floor(Math.random() * (1500 - 800 + 1)) + 800,
            'Target': 1200,
        }));
    }, []);

    const recentActivity = useMemo(() => [
        { id: 1, user: 'Alex Turner', action: 'approved a stock request for Assembly Line 2.', time: '5m ago' },
        { id: 2, user: 'System', action: 'predicted a 10% increase in demand for Product X.', time: '30m ago' },
        { id: 3, user: 'Vehicle TR-1138', action: 'completed delivery route #42.', time: '1h ago' },
        { id: 4, user: 'Sarah Chen', action: 'reported a maintenance issue on Conveyor Belt 3.', time: '2h ago' },
    ], []);

    return {
        dashboardStats,
        productionChartData,
        recentActivity,
    };
};
