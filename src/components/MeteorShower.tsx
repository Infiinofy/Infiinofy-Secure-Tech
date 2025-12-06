import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Meteor {
  id: number;
  startX: number; // percentage of viewport width
  startY: number; // percentage of viewport height (can start above viewport)
  trail: number; // px length of trail
  duration: number; // seconds for the streak
  direction: 'left' | 'right'; // direction of meteor streak
}

interface MeteorShowerProps {
  intervalMs?: number;
  burstMin?: number;
  burstMax?: number;
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

/**
 * Google-style meteor shower overlay. Position this as absolute within a section.
 */
export default function MeteorShower({
  intervalMs = 5000,
  burstMin = 5,
  burstMax = 8,
}: MeteorShowerProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const idRef = useRef(0);
  const burstDirectionRef = useRef<'left' | 'right'>('left');

  const spawnBurst = useMemo(
    () => () => {
      const count = Math.floor(randomBetween(burstMin, burstMax + 1));
      const now = Date.now();
      const currentDirection = burstDirectionRef.current;
      
      const fresh: Meteor[] = Array.from({ length: count }).map(() => {
        idRef.current += 1;
        return {
          id: now + idRef.current,
          startX: randomBetween(0, 100),
          startY: randomBetween(-10, 30),
          trail: randomBetween(120, 200),
          duration: randomBetween(1.2, 1.8),
          direction: currentDirection,
        };
      });

      // Toggle direction for next burst
      burstDirectionRef.current = currentDirection === 'left' ? 'right' : 'left';

      setMeteors((prev) => [...prev, ...fresh]);

      // Cleanup after each meteor finishes its streak
      fresh.forEach((m) => {
        const timeout = setTimeout(() => {
          setMeteors((prev) => prev.filter((item) => item.id !== m.id));
        }, m.duration * 1000 + 120);

        // In case component unmounts before timeout
        return () => clearTimeout(timeout);
      });
    },
    [burstMin, burstMax]
  );

  useEffect(() => {
    // Initial burst
    spawnBurst();
    const interval = setInterval(spawnBurst, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs, spawnBurst]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m) => {
        const endX = m.direction === 'left' ? -600 : 600;
        const rotation = m.direction === 'left' ? '-45deg' : '45deg';
        const trailTransform = m.direction === 'left' ? 'translateX(0)' : 'translateX(-100%)';
        return (
        <motion.div
          key={m.id}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: endX, y: 600, opacity: [0, 1, 0] }}
          transition={{ duration: m.duration, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: `${m.startX}%`,
            top: `${m.startY}%`,
            rotate: rotation,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${m.trail}px`,
              height: "2px",
              background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0))",
              filter: "blur(0.5px)",
              transform: trailTransform,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "9999px",
              background: "radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.4) 70%)",
              boxShadow: "0 0 12px 6px rgba(255,255,255,0.35)",
            }}
          />
        </motion.div>
        );
      })}
    </div>
  );
}
