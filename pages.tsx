// Fix: Provide implementation for all page components.
import React from 'react';

const PagePlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="text-center p-10 bg-light-card dark:bg-dark-card rounded-lg shadow-md">
    <h1 className="text-4xl font-bold mb-4 text-light-text dark:text-dark-text">{title}</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400">This page is under construction.</p>
  </div>
);

export const Dashboard = () => <PagePlaceholder title="Dashboard" />;
export const Attendance = () => <PagePlaceholder title="Attendance" />;
export const Stock = () => <PagePlaceholder title="Stock" />;
export const Prediction = () => <PagePlaceholder title="Prediction" />;
export const Deliveries = () => <PagePlaceholder title="Deliveries" />;
export const VehicleTracking = () => <PagePlaceholder title="Vehicle Tracking" />;
export const TVMode = () => <PagePlaceholder title="TV Mode" />;
export const Settings = () => <PagePlaceholder title="Settings" />;
