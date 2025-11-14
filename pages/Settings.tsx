
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
              <label htmlFor="email-notifs" className="font-medium">Email Notifications</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="email-notifs" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                <label htmlFor="email-notifs" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
           </div>
           <div className="flex items-center justify-between">
              <label htmlFor="push-notifs" className="font-medium">Push Notifications</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="push-notifs" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                <label htmlFor="push-notifs" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
           </div>
        </CardContent>
      </Card>
      <style>{`
        .toggle-checkbox:checked {
            right: 0;
            border-color: #2563eb;
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Settings;