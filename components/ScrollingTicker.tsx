
import React from 'react';
import { Truck, Package, Factory, AlertTriangle } from 'lucide-react';
import type { StockItem, Delivery } from '../types';

interface ScrollingTickerProps {
    stock: StockItem[];
    deliveries: Delivery[];
}

const ScrollingTicker: React.FC<ScrollingTickerProps> = ({ stock, deliveries }) => {
    const lowStockItems = stock.filter(item => item.sufficiency === 'Low').slice(0, 3);
    const inTransitDeliveries = deliveries.filter(d => d.status === 'In Transit').slice(0, 3);

    const tickerItems = [
        ...lowStockItems.map(item => ({
            icon: <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />,
            text: `Low Stock Alert: ${item.name} at ${((item.quantity/item.capacity)*100).toFixed(0)}% capacity.`,
        })),
        ...inTransitDeliveries.map(item => ({
            icon: <Truck className="h-5 w-5 text-blue-400 flex-shrink-0" />,
            text: `Delivery In Transit: ${item.item} (${item.quantity} units) ETA: ${item.eta}.`,
        })),
        { icon: <Factory className="h-5 w-5 text-green-400 flex-shrink-0" />, text: "Production line Alpha operating at 98% efficiency." },
        { icon: <Package className="h-5 w-5 text-purple-400 flex-shrink-0" />, text: "New material shipment scheduled for tomorrow 8:00 AM." },
    ];
    
    // Duplicate items to create a seamless loop
    const extendedTickerItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full h-16 bg-gray-800 dark:bg-black overflow-hidden whitespace-nowrap">
      <div className="absolute top-0 left-0 h-full flex items-center animate-scroll">
        {extendedTickerItems.map((item, index) => (
          <div key={index} className="flex items-center mx-8 text-gray-300 text-lg">
            {item.icon}
            <span className="ml-3">{item.text}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollingTicker;
