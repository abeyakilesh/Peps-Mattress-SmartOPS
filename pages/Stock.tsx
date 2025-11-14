import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import type { StockItem } from '../types';

const sufficiencyColors = {
  High: 'bg-green-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-red-500',
};

const Stock: React.FC = () => {
  const { stock, loading } = useContext(DataContext);

  if (loading) return <StockSkeleton />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Material Stock Levels</CardTitle>
        <CardDescription>Overview of all raw materials and components in inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stock.map((item: StockItem) => {
            const percentage = (item.quantity / item.capacity) * 100;
            return (
              <div key={item.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-black">{item.name}</span>
                  <span className="text-sm text-gray-800">{item.quantity} / {item.capacity} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${sufficiencyColors[item.sufficiency]}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const StockSkeleton: React.FC = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                        <Skeleton className="h-4 w-full rounded-full" />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

export default Stock;