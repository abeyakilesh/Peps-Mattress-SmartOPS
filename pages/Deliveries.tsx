import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import type { Delivery } from '../types';
import { ChevronDown } from 'lucide-react';

const statusColors: Record<Delivery['status'], string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Transit': 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Delayed: 'bg-red-100 text-red-800',
};

const Deliveries: React.FC = () => {
  const { deliveries, loading, updateDeliveryStatus } = useContext(DataContext);
  const [filter, setFilter] = useState('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filteredDeliveries = deliveries.filter(d => filter === 'All' || d.status === filter);

  if (loading) return <DeliveriesSkeleton />;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Delivery Log</CardTitle>
                <CardDescription>Track and update all incoming and outgoing shipments.</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
                {['All', ...Object.keys(statusColors)].map(status => (
                    <button 
                        key={status} 
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            filter === status 
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="text-xs text-gray-900 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Delivery ID</th>
                <th scope="col" className="px-6 py-3">Item</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Vehicle ID</th>
                <th scope="col" className="px-6 py-3">ETA</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((d: Delivery) => (
                <tr key={d.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap">{d.id}</td>
                  <td className="px-6 py-4">{d.item}</td>
                  <td className="px-6 py-4">{d.quantity}</td>
                  <td className="px-6 py-4">{d.vehicleId}</td>
                  <td className="px-6 py-4">{new Date(d.eta).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                        <button
                            onClick={() => setOpenDropdown(openDropdown === d.id ? null : d.id)}
                            className={`px-3 py-1.5 w-32 flex items-center justify-between rounded-md text-xs font-semibold transition-all ${statusColors[d.status]}`}
                        >
                            <span>{d.status}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === d.id ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown === d.id && (
                            <div className="absolute z-10 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200">
                                {Object.keys(statusColors).map(status => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            updateDeliveryStatus(d.id, status as Delivery['status']);
                                            setOpenDropdown(null);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-xs text-gray-900 hover:bg-gray-100"
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const DeliveriesSkeleton = () => (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-16 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
        </CardContent>
    </Card>
);

export default Deliveries;