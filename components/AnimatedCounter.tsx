
import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  precision?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, duration = 1.5, className, precision = 0 }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = value.toFixed(precision);
      },
    });

    return () => controls.stop();
  }, [from, to, duration, precision]);

  return <span ref={nodeRef} className={className} />;
};

export default AnimatedCounter;
