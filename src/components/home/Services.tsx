"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Globe,
  Code,
  Smartphone,
  Paintbrush2,
  Megaphone,
  Settings,
} from "lucide-react";
import MeteorShower from "../MeteorShower";


// Background floating particles
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  radius: number;
}

function Particles({ count = 60 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 12;
      arr.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.floor(Math.random() * 3) + 2,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 6,
        opacity: 0.08 + Math.random() * 0.12,
        radius,
      });
    }
    setParticles(arr);
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => {
        const keyframesX = [0, p.radius, 0, -p.radius, 0];
        const keyframesY = [-p.radius, 0, p.radius, 0, -p.radius];
        return (
          <motion.span
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            } as React.CSSProperties}
            className="absolute rounded-full bg-white"
            initial={{ x: 0, y: 0 }}
            animate={{ x: keyframesX, y: keyframesY }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
}

// Service blob card
import { ReactNode } from "react";

export interface ServiceData {
  id: string;
  title: string;
  color: string;
  icon: ReactNode;
  items: string[];
  position?: { x: number; y: number };
}

interface BlobProps extends ServiceData {
  index: number;
  isVisible: boolean;
  hoveredId: string | null;
  setHovered: (id: string | null) => void;
  desktop: boolean;
  onBlobRef?: (ref: { x: number; y: number } | null) => void;
}

interface CenterBubbleProps {
  service: ServiceData | null;
  isVisible: boolean;
  originPosition?: { x: number; y: number };
}

// Center bubble component that animates from the split blob to the center
function CenterBubble({ service, isVisible, originPosition }: CenterBubbleProps) {
  if (!service) return null;

  return (
    <motion.div
      key={`center-${service.id}`}
      initial={{
        opacity: 0,
        scale: 0.8,
        x: originPosition?.x || 0,
        y: originPosition?.y || 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: originPosition?.x || 0,
        y: originPosition?.y || 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="absolute w-80 z-50 pointer-events-auto"
      style={{
        left: "50%",
        top: "50%",
        marginLeft: "-160px",
        marginTop: "-160px",
      }}
    >
      <motion.div
        style={{
          borderRadius: "32px",
          boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 40px ${service.color}40, 0 12px 40px ${service.color}30`,
        }}
        className="relative bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70 p-8"
      >
        <div
          style={{
            borderRadius: "32px",
            background: `linear-gradient(135deg, ${service.color}20, transparent)`,
            opacity: 0.2,
          }}
          className="absolute inset-0"
        />

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{
              filter: `drop-shadow(0 0 10px ${service.color})`,
              color: service.color,
            }}
            className="mx-auto mb-4 flex justify-center"
          >
            {React.cloneElement(service.icon as React.ReactElement, {
              className: "w-10 h-10",
            })}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            style={{ color: service.color }}
            className="text-2xl font-semibold mb-4 text-center font-poppins"
          >
            {service.title}
          </motion.h3>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-2 mb-6 border-t border-[#3a4f6a]/70 pt-4"
          >
            {service.items.map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + idx * 0.05, duration: 0.3 }}
                className="flex items-center text-sm text-[#b0c4de]"
              >
                <span
                  style={{ backgroundColor: service.color }}
                  className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-full border transition-colors"
            style={{ borderColor: service.color, color: service.color }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = `${service.color}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Learn More →
          </motion.button> */}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceBlob(props: BlobProps) {
  const { id, title, color, icon, items, index, isVisible, hoveredId, setHovered, desktop, onBlobRef } = props;
  const isHovered = hoveredId === id;
  const blobRef = useRef<HTMLDivElement>(null);

  const baseSize = desktop ? 200 : 180;

  const angle = useMemo(() => (index * 360) / 6, [index]);
  const radius = 320;

  const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;

  useEffect(() => {
    if (isHovered && blobRef.current) {
      const rect = blobRef.current.getBoundingClientRect();
      onBlobRef?.({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [isHovered, onBlobRef]);

  return desktop ? (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      ref={blobRef}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: [0.45, 0.05, 0.55, 0.95],
          delay: index * 0.3,
        }}
      >
        <div
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setHovered(isHovered ? null : id)}
          className={`cursor-pointer relative w-${baseSize} h-${baseSize} transition-all duration-700 ease-out ${
            isVisible ? (isHovered ? "scale-110" : "scale-100") : "scale-0"
          }`}
          style={{
            width: `${baseSize}px`,
            height: `${baseSize}px`,
          }}
        >
          {/* Left lobe (stays in place) */}
          <motion.div
            animate={{
              scale: isHovered ? 1 : 1,
              x: isHovered ? -40 : 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            style={{
              borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
              boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 ${isHovered ? 30 : 22}px ${color}40, 0 12px ${
                isHovered ? 30 : 24
              }px ${color}30`,
            }}
            className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70 transition-all duration-500 ease-out"
          >
            <div
              style={{
                borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                background: `linear-gradient(135deg, ${color}20, transparent)`,
                opacity: isHovered ? 0.2 : 0.1,
              }}
              className="absolute inset-0 transition-opacity duration-500"
            />

            <div className="relative z-10 text-center h-full flex flex-col items-center justify-center p-6">
              <div
                style={{
                  filter: `drop-shadow(0 0 10px ${color})`,
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  color,
                }}
                className="mb-2 transition-transform duration-300"
              >
                {icon}
              </div>
              <h3
                style={{ color: isHovered ? color : "#ffffff" }}
                className="text-sm font-semibold font-poppins transition-colors duration-300"
              >
                {title}
              </h3>
            </div>
          </motion.div>

          {/* Right lobe (splits off and moves to center) - only show on hover */}
          {isHovered && (
            <motion.div
              initial={{
                scale: 1,
                x: 0,
                opacity: 1,
              }}
              animate={{
                scale: 1,
                x: 80,
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              style={{
                borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 30px ${color}40, 0 12px 30px ${color}30`,
                pointerEvents: "none",
              }}
              className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70"
            >
              <div
                style={{
                  borderRadius: "52% 48% 58% 42% / 48% 54% 46% 52%",
                  background: `linear-gradient(135deg, ${color}20, transparent)`,
                  opacity: 0.2,
                }}
                className="absolute inset-0"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  ) : (
    // Mobile version - keep original expandable behavior
    <motion.div
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        setHovered(isHovered ? null : id);
      }}
      className={`relative cursor-pointer transition-all duration-700 ease-out mx-auto ${
        isVisible ? (isHovered ? "scale-[1.03]" : "scale-100") : "scale-95"
      }`}
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
        delay: index * 0.25,
      }}
      style={{
        width: isHovered ? 280 : 180,
        height: isHovered ? 260 : 180,
        zIndex: isHovered ? 50 : 10,
      }}
    >
      <div
        style={{
          borderRadius: isHovered ? "32px" : "52% 48% 58% 42% / 48% 54% 46% 52%",
          boxShadow: `inset 0 10px 30px rgba(0,0,0,0.35), 0 0 ${isHovered ? 40 : 22}px ${color}40, 0 12px ${
            isHovered ? 40 : 24
          }px ${color}30`,
        }}
        className="relative h-full w-full bg-gradient-to-br from-[#1a1f3a] to-[#2a2f4a] backdrop-blur-sm border border-[#3a4f6a]/70 p-6 transition-all duration-500 ease-out"
      >
        <div
          style={{
            borderRadius: isHovered ? "32px" : "52% 48% 58% 42% / 48% 54% 46% 52%",
            background: `linear-gradient(135deg, ${color}20, transparent)`,
            opacity: isHovered ? 0.2 : 0.1,
          }}
          className="absolute inset-0 transition-opacity duration-500"
        />

        <div className="relative z-10 text-center">
          <div
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              color,
            }}
            className="mx-auto mb-3 transition-transform duration-300"
          >
            {icon}
          </div>
          <h3
            style={{ color: isHovered ? color : "#ffffff" }}
            className="text-lg font-semibold mb-2 font-poppins transition-colors duration-300"
          >
            {title}
          </h3>

          <div
            style={{
              maxHeight: isHovered ? 220 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            className="overflow-hidden transition-all duration-500 ease-out"
          >
            <div
              style={{
                transform: isHovered ? "translateY(0)" : "translateY(-10px)",
              }}
              className="pt-3 border-t border-[#3a4f6a]/70 transition-transform duration-300 text-left"
            >
              <ul className="space-y-2 mb-4">
                {items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-[#b0c4de]">
                    <span
                      style={{ backgroundColor: color }}
                      className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {/* <button
                className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-full border transition-colors"
                style={{ borderColor: color, color }}
                onMouseEnter={(e) => ((e.currentTarget.style.background = `${color}20`))}
                onMouseLeave={(e) => ((e.currentTarget.style.background = "transparent"))}
              >
                Learn More →
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [blobPosition, setBlobPosition] = useState<{ x: number; y: number } | null>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  // Calculate container-relative position
  const getContainerRelativePosition = (viewportPos: { x: number; y: number }) => {
    if (!circleContainerRef.current) return { x: 0, y: 0 };
    const rect = circleContainerRef.current.getBoundingClientRect();
    const containerCenterX = rect.width / 2;
    const containerCenterY = rect.height / 2;
    
    return {
      x: viewportPos.x - rect.left - containerCenterX,
      y: viewportPos.y - rect.top - containerCenterY,
    };
  };

  const services: ServiceData[] = useMemo(
    () => [
      {
        id: "erp",
        title: "ERP Implementation",
        color: "#22d3ee",
        icon: <Users className="w-8 h-8" />,
        items: ["Zoho One", "Zoho CRM Plus", "Zoho People Plus", "Odoo", "Monday.com"],
        position: { x: 18, y: 30 },
      },
      {
        id: "automation",
        title: "Automation",
        color: "#f97316",
        icon: <Settings className="w-8 h-8" />,
        items: ["Zapier workflows", "API integrations", "Dashboards", "Chatbots", "Webhook Integration"],
        position: { x: 65, y: 24 },
      },
      {
        id: "marketing",
        title: "Digital Marketing",
        color: "#ef4444",
        icon: <Megaphone className="w-8 h-8" />,
        items: ["SEO", "Social media", "Paid ads", "Email campaigns", "Analytics"],
        position: { x: 82, y: 60 },
      },
      {
        id: "apps",
        title: "App Development",
        color: "#a855f7",
        icon: <Smartphone className="w-8 h-8" />,
        items: ["Zoho Creator", "Android & iOS apps"],
        position: { x: 40, y: 70 },
      },
      {
        id: "design",
        title: "Graphic Design",
        color: "#fb923c",
        icon: <Paintbrush2 className="w-8 h-8" />,
        items: ["Figma", "Canva", "Branding & logos"],
        position: { x: 32, y: 42 },
      },
      {
        id: "web",
        title: "Web Development",
        color: "#3b82f6",
        icon: <Code className="w-8 h-8" />,
        items: ["WordPress", "Wix", "Zoho Sites", "Shopify", "Full-stack from scratch"],
        position: { x: 55, y: 80 },
      },
    ],
    []
  );

  // Default to an expanded card on mobile and reset on desktop
  useEffect(() => {
    if (!isDesktop) {
      setHovered((prev) => prev ?? services[0].id);
    } else {
      setHovered(null);
    }
  }, [isDesktop]);

  return (
    <section id="services" ref={ref} className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E293B]/50 to-transparent" />
      <Particles count={80} />
      <MeteorShower />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Core Services</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-60">
            We provide a range of IT services to help your business thrive in the digital age.
          </p>
        </motion.div>

        <div className="relative lg:min-h-[600px] mb-60">
          <div className="hidden lg:block relative w-full h-[600px]" ref={circleContainerRef}>
            {services.map((s, idx) => (
              <ServiceBlob
                key={s.id}
                {...s}
                index={idx}
                isVisible={isInView}
                hoveredId={hovered}
                setHovered={setHovered}
                desktop={true}
                onBlobRef={(pos) => {
                  if (hovered === s.id && pos) {
                    setBlobPosition(pos);
                  }
                }}
              />
            ))}

            {/* Center Bubble that appears on hover */}
            {hovered && blobPosition && (
              <CenterBubble
                service={services.find((s) => s.id === hovered)!}
                isVisible={true}
                originPosition={getContainerRelativePosition(blobPosition)}
              />
            )}
          </div>

          <div className="flex flex-col items-center gap-6 lg:hidden">
            {services.map((s, idx) => (
              <ServiceBlob
                key={s.id}
                {...s}
                index={idx}
                isVisible={isInView}
                hoveredId={hovered}
                setHovered={setHovered}
                desktop={false}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
