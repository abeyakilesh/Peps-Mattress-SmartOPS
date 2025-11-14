import { useState, useEffect, useCallback } from 'react';
import { Users, Package, Truck, TrendingUp } from 'lucide-react';
import type { KPI, AttendanceData, StockItem, Delivery, Vehicle, Notification } from '../types';

const generateRandomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Mock data generation functions
const createMockKPIs = (): KPI[] => [
    { title: 'Units Produced', value: '1,250', change: '+12.5%', changeType: 'increase', icon: Package },
    { title: 'Operational Efficiency', value: '94.2%', change: '-0.8%', changeType: 'decrease', icon: TrendingUp },
    { title: 'Workforce Present', value: '182', change: '+3', changeType: 'increase', icon: Users },
    { title: 'On-time Deliveries', value: '98.1%', change: '+1.2%', changeType: 'increase', icon: Truck },
];

const createMockAttendance = (): AttendanceData[] => {
    const data: AttendanceData[] = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const present = generateRandomInRange(170, 190);
        const absent = 200 - present;
        const male = Math.floor(present * (generateRandomInRange(55, 65) / 100));
        const female = present - male;
        data.push({
            date: date.toISOString(),
            present,
            absent,
            ageGroups: {
                '<25': generateRandomInRange(30, 50),
                '25-40': generateRandomInRange(90, 110),
                '>40': generateRandomInRange(30, 40),
            },
            genderBreakdown: {
                male,
                female,
            }
        });
    }
    return data;
};

const createMockStock = (): StockItem[] => [
    { id: 'S001', name: 'Pocket Coils (Units)', quantity: 8500, capacity: 10000, sufficiency: 'High' },
    { id: 'S002', name: 'Memory Foam (kg)', quantity: 450, capacity: 1000, sufficiency: 'Medium' },
    { id: 'S003', name: 'Latex Foam (kg)', quantity: 150, capacity: 500, sufficiency: 'Low' },
    { id: 'S004', name: 'Organic Cotton Fabric (m²)', quantity: 4800, capacity: 5000, sufficiency: 'High' },
    { id: 'S005', name: 'Polyester Fiberfill (kg)', quantity: 320, capacity: 600, sufficiency: 'Medium' },
];

const createMockDeliveries = (): Delivery[] => [
    { id: 'D001', vehicleId: 'V01', item: 'Latex Foam (kg)', quantity: 200, status: 'In Transit', eta: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() },
    { id: 'D002', vehicleId: 'V03', item: 'Pocket Coils (Units)', quantity: 5000, status: 'Delivered', eta: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 'D003', vehicleId: 'V02', item: 'Polyester Fiberfill (kg)', quantity: 300, status: 'Pending', eta: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
    { id: 'D004', vehicleId: 'V04', item: 'Memory Foam (kg)', quantity: 200, status: 'Delayed', eta: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: 'D005', vehicleId: 'V05', item: 'Organic Cotton Fabric (m²)', quantity: 1000, status: 'Delivered', eta: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'D006', vehicleId: 'V01', item: 'Pocket Coils (Units)', quantity: 1500, status: 'In Transit', eta: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() },
];

const createMockVehicles = (): Vehicle[] => [
    { id: 'V01', type: 'Truck', status: 'In Transit', location: [34.0522, -118.2437] }, // LA
    { id: 'V02', type: 'Van', status: 'Idle', location: [34.1522, -118.3437] },
    { id: 'V03', type: 'Truck', status: 'In Transit', location: [33.9522, -118.1437] },
    { id: 'V04', type: 'Truck', status: 'Idle', location: [34.0522, -118.4437] },
    { id: 'V05', type: 'Van', status: 'In Transit', location: [34.1022, -118.2037] },
];

const createMockNotifications = (): Notification[] => [
    { id: 1, message: 'Stock for Latex Foam (kg) is low.', type: 'alert', timestamp: '2 hours ago' },
    { id: 2, message: 'Delivery D002 has been successfully completed.', type: 'success', timestamp: '1 hour ago' },
    { id: 3, message: 'Vehicle V04 has reported a delay.', type: 'alert', timestamp: '3 hours ago' },
];

export const useMockData = (enabled: boolean) => {
    const [loading, setLoading] = useState(true);
    const [kpis, setKpis] = useState<KPI[]>([]);
    const [attendance, setAttendance] = useState<AttendanceData[]>([]);
    const [stock, setStock] = useState<StockItem[]>([]);
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (enabled) {
            setLoading(true);
            const timer = setTimeout(() => {
                setKpis(createMockKPIs());
                setAttendance(createMockAttendance());
                setStock(createMockStock());
                setDeliveries(createMockDeliveries());
                setVehicles(createMockVehicles());
                setNotifications(createMockNotifications());
                setLoading(false);
            }, 1000); // Simulate network delay
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [enabled]);

    const recalculatePrediction = useCallback((workers: number, materialFactor: number) => {
        const baseProduction = 5; // units per worker
        const workerEfficiency = 1 - (200 - workers) / 200 * 0.5; // Efficiency drop if workers are less than 200
        const rawPrediction = workers * baseProduction * workerEfficiency * materialFactor;
        const prediction = Math.floor(rawPrediction);
        const confidenceMargin = Math.floor(prediction * 0.05);
        const confidence: [number, number] = [prediction - confidenceMargin, prediction + confidenceMargin];
        return { prediction, confidence };
    }, []);

    const addDelivery = useCallback((delivery: Omit<Delivery, 'id' | 'status' | 'eta'>) => {
        const newDelivery: Delivery = {
            ...delivery,
            id: `D${String(deliveries.length + 1).padStart(3, '0')}`,
            status: 'Pending',
            eta: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        };
        setDeliveries(prev => [newDelivery, ...prev]);
        setNotifications(prev => [{
            id: prev.length + 1,
            message: `New delivery ${newDelivery.id} for ${newDelivery.item} has been scheduled.`,
            type: 'success',
            timestamp: 'Just now'
        }, ...prev]);
    }, [deliveries.length]);

    const updateDeliveryStatus = useCallback((deliveryId: string, newStatus: Delivery['status']) => {
        setDeliveries(prevDeliveries =>
            prevDeliveries.map(d =>
                d.id === deliveryId ? { ...d, status: newStatus } : d
            )
        );
        setNotifications(prev => [{
            id: prev.length + 1,
            message: `Delivery ${deliveryId} status updated to ${newStatus}.`,
            type: 'info',
            timestamp: 'Just now'
        }, ...prev]);
    }, []);

    return { loading, kpis, attendance, stock, deliveries, vehicles, notifications, recalculatePrediction, addDelivery, updateDeliveryStatus };
}