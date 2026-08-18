import React, { useEffect, useRef } from "react";

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      createParticles();
    };

    const createParticles = () => {
      particles = [];

      const particleCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 18000
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.4 + 0.6,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) {
          particle.x = canvas.width;
        }

        if (particle.x > canvas.width) {
          particle.x = 0;
        }

        if (particle.y < 0) {
          particle.y = canvas.height;
        }

        if (particle.y > canvas.height) {
          particle.y = 0;
        }

        // Small glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );

        gradient.addColorStop(
          0,
          "rgba(31, 162, 255, 0.55)"
        );

        gradient.addColorStop(
          1,
          "rgba(31, 162, 255, 0)"
        );

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size * 4,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = gradient;
        ctx.fill();

        // Particle center
        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "rgba(80, 200, 255, 0.65)";
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx =
            particles[i].x - particles[j].x;

          const dy =
            particles[i].y - particles[j].y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < 125) {
            const opacity =
              (1 - distance / 125) * 0.2;

            ctx.beginPath();

            ctx.moveTo(
              particles[i].x,
              particles[i].y
            );

            ctx.lineTo(
              particles[j].x,
              particles[j].y
            );

            ctx.strokeStyle = `rgba(18, 216, 250, ${opacity})`;

            ctx.lineWidth = 0.6;

            ctx.stroke();
          }
        }
      }

      animationFrameId =
        requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
};

export default InteractiveBackground;