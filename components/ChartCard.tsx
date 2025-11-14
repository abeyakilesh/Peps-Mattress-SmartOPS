import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;