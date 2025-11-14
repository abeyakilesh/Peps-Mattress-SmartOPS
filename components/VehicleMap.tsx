import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Vehicle } from '../types';

interface VehicleMapProps {
    vehicles: Vehicle[];
}

const VehicleMap: React.FC<VehicleMapProps> = ({ vehicles }) => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    // Simple normalization for placeholder map. Center: [34.05, -118.25]
    const mapBounds = {
        latMin: 33.9, latMax: 34.2,
        lngMin: -118.5, lngMax: -118.1,
    };

    const normalizePosition = (location: [number, number]) => {
        const [lat, lng] = location;
        const top = 100 - ((lat - mapBounds.latMin) / (mapBounds.latMax - mapBounds.latMin)) * 100;
        const left = ((lng - mapBounds.lngMin) / (mapBounds.lngMax - mapBounds.lngMin)) * 100;
        return { top: `${top}%`, left: `${left}%` };
    };

    return (
        <div className="w-full h-full bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-2xl font-semibold">Map Placeholder</p>
            </div>
            {vehicles.map(vehicle => {
                const { top, left } = normalizePosition(vehicle.location);
                const isSelected = selectedVehicle?.id === vehicle.id;
                return (
                    <div
                        key={vehicle.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSelected ? 'z-10' : ''}`}
                        style={{ top, left }}
                        onMouseEnter={() => setSelectedVehicle(vehicle)}
                        onMouseLeave={() => setSelectedVehicle(null)}
                    >
                        <MapPin className={`h-8 w-8 drop-shadow-lg transition-transform duration-200 ${
                            vehicle.status === 'In Transit' ? 'text-blue-500' : 'text-gray-800'
                        } ${isSelected ? 'scale-150' : 'scale-100'}`} />
                        {isSelected && (
                            <div className="absolute bottom-full mb-2 w-32 bg-white p-2 rounded-lg shadow-lg text-xs text-center animate-fade-in">
                                <p className="font-bold">{vehicle.id}</p>
                                <p>{vehicle.status}</p>
                            </div>
                        )}
                    </div>
                );
            })}
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
             `}</style>
        </div>
    );
};

export default VehicleMap;