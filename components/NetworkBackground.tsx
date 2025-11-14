import React, { useRef, useEffect, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

const NetworkBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    const connectDistance = 150;
    // Using a teal color that works well on both light and dark themes
    const particleColor = 'rgba(19, 78, 74, 0.7)'; // teal-800 with opacity
    const lineColor = 'rgba(19, 78, 74, opacity)'; // Placeholder for dynamic opacity

    const resizeCanvas = () => {
      // Set canvas dimensions based on its displayed size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Adjust particle density based on screen area
      const numberOfParticles = (canvas.height * canvas.width) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 1, // Particle size
          vx: (Math.random() - 0.5) * 0.5, // Horizontal velocity
          vy: (Math.random() - 0.5) * 0.5, // Vertical velocity
        });
      }
    };
    
    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = particleColor;
      ctx.fill();
    };

    const updateParticle = (particle: Particle) => {
      // Bounce particles off the edges of the canvas
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }
      
      // Update particle position based on its velocity
      particle.x += particle.vx;
      particle.y += particle.vy;
    };
    
    const drawLines = () => {
      // Compare each particle to every other particle
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If particles are close enough, draw a line between them
          if (distance < connectDistance) {
            ctx.beginPath();
            // Line opacity is inversely proportional to the distance
            ctx.strokeStyle = lineColor.replace('opacity', `${1 - distance / connectDistance}`);
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    };

    // The main animation loop
    const animate = () => {
      // Clear the canvas on each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each particle
      particles.forEach(p => {
        updateParticle(p);
        drawParticle(p);
      });
      
      // Draw the connecting lines
      drawLines();
      
      // Request the next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    animate();

    // Add resize listener to make it responsive
    window.addEventListener('resize', resizeCanvas);

    // Cleanup function to run when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
        {/* The canvas is positioned to fill its container and stay in the background */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10 h-full">
            {children}
        </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders, which is crucial for performance with canvas animations.
export default memo(NetworkBackground);