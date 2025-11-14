
import React, { useState, useContext, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import ChartCard from '../components/ChartCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import AnimatedCounter from '../components/AnimatedCounter';

const Prediction: React.FC = () => {
    const { loading, recalculatePrediction, attendance } = useContext(DataContext);
    
    // Default to a reasonable number if attendance data isn't ready.
    const latestAttendancePresent = attendance.length > 0 ? attendance[attendance.length - 1].present : 182;

    const [workers, setWorkers] = useState(latestAttendancePresent);
    const [materialFactor, setMaterialFactor] = useState(1); // 1 = 100%

    // Recalculate prediction when inputs change
    const { prediction, confidence } = useMemo(() => {
        return recalculatePrediction(workers, materialFactor);
    }, [workers, materialFactor, recalculatePrediction]);

    if (loading) {
        return <PredictionSkeleton />;
    }

    const predictionData = [
        {
            name: 'Forecast',
            'Predicted Units': prediction,
            range: confidence,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Controls Card */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Prediction Controls</CardTitle>
                        <CardDescription>Adjust variables to forecast production output.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-4">
                        <div>
                            <label htmlFor="workers-slider" className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                                <span>Number of Workers</span>
                                <span className="font-bold">{workers}</span>
                            </label>
                            <input
                                id="workers-slider"
                                type="range"
                                min="100"
                                max="200"
                                value={workers}
                                onChange={(e) => setWorkers(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="material-slider" className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                                <span>Material Availability</span>
                                <span className="font-bold">{(materialFactor * 100).toFixed(0)}%</span>
                            </label>
                             <input
                                id="material-slider"
                                type="range"
                                min="0.5"
                                max="1.2"
                                step="0.05"
                                value={materialFactor}
                                onChange={(e) => setMaterialFactor(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Result Card */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Predicted Production Output</CardTitle>
                        <CardDescription>Based on the selected parameters.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-[200px]">
                        <div className="text-center">
                             <p className="text-6xl font-bold text-blue-600">
                                <AnimatedCounter to={prediction} precision={0} />
                             </p>
                            <p className="text-lg text-gray-800">Units</p>
                            <p className="text-sm text-gray-700 mt-2">
                                95% Confidence Interval: <span className="font-semibold">{confidence[0]} - {confidence[1]}</span> units
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            {/* Chart Card */}
            <ChartCard title="Production Forecast Visualization">
                 <div className="absolute top-4 right-6 text-xs text-gray-700 flex items-center">
                    <svg className="w-8 h-2 mr-2" aria-hidden="true" focusable="false">
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="red" strokeWidth="2" strokeDasharray="3 3"/>
                    </svg>
                    <span>Confidence Interval</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={predictionData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" stroke="#374151" fontSize={12} domain={[0, dataMax => Math.ceil((dataMax + 50) / 100) * 100]} />
                        <YAxis type="category" dataKey="name" stroke="#374151" fontSize={12} tick={false} axisLine={false} />
                        <Tooltip
                            cursor={{fill: 'rgba(239, 246, 255, 0.5)'}}
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderColor: '#e5e7eb',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                            }}
                            formatter={(value, name, props) => {
                                if (name === 'Predicted Units' && props.payload.range) {
                                    return [
                                        `${value}`,
                                        `Prediction (95% CI: ${props.payload.range[0]}-${props.payload.range[1]})`
                                    ];
                                }
                                return [value, name];
                            }}
                        />
                        <Bar dataKey="Predicted Units" fill="#2563eb" barSize={60} />
                        <ReferenceLine x={confidence[0]} stroke="red" strokeDasharray="3 3" />
                        <ReferenceLine x={confidence[1]} stroke="red" strokeDasharray="3 3" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
};

const PredictionSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-8 pt-4">
                    <div>
                        <div className="flex justify-between"><Skeleton className="h-4 w-1/2 mb-2" /><Skeleton className="h-4 w-8 mb-2" /></div>
                        <Skeleton className="h-2 w-full rounded-lg" />
                    </div>
                     <div>
                        <div className="flex justify-between"><Skeleton className="h-4 w-1/2 mb-2" /><Skeleton className="h-4 w-12 mb-2" /></div>
                        <Skeleton className="h-2 w-full rounded-lg" />
                    </div>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <Skeleton className="h-6 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                 <CardContent className="flex flex-col items-center justify-center h-[200px]">
                    <Skeleton className="h-16 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-40" />
                </CardContent>
            </Card>
        </div>
         <Card>
            <CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader>
            <CardContent><Skeleton className="h-64 w-full" /></CardContent>
         </Card>
    </div>
);

export default Prediction;
