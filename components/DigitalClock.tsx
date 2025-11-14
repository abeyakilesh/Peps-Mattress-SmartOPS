
import React, { useState, useEffect } from 'react';

const DigitalClock: React.FC<{className?: string}> = ({ className }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={`font-mono text-center ${className}`}>
      <div className="text-5xl md:text-7xl font-bold tracking-widest">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-lg md:text-2xl mt-2 tracking-wider">
        {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
};

export default DigitalClock;
