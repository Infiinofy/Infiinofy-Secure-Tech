import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero_bg.png";
import InteractiveSpiral from "@/components/InteractiveSpiral";
import MeteorShower from "@/components/MeteorShower"
import TwinklingStars from "@/components/TwinklingStars";
const phrases = [
  "Digital Presence",
  "Intelligent Products",
  "Future-Ready Platforms",
];

const Hero = () => {
const [displayText, setDisplayText] = useState("");
const [phraseIndex, setPhraseIndex] = useState(0);
const [phase, setPhase] = useState<Phase>("typing");
  const particles = useMemo(
    () =>
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

//  const phrases = [
//   "Digital Presence",
//   "Intelligent Products",
//   "Future-Ready Platforms",
// ];

const TYPING_SPEED = 80;      // ms per character when typing
const DELETING_SPEED = 40;    // ms per character when deleting
const PAUSE_AT_END = 1200;    // pause when phrase is fully typed
const PAUSE_AT_START = 300;   // pause when phrase has been fully deleted

type Phase = "typing" | "pausing" | "deleting";


useEffect(() => {
  const currentPhrase = phrases[phraseIndex];

  let delay: number;

  if (phase === "typing") {
    delay = TYPING_SPEED;
  } else if (phase === "deleting") {
    delay = DELETING_SPEED;
  } else {
    // pausing
    delay = displayText === "" ? PAUSE_AT_START : PAUSE_AT_END;
  }

  const timeout = setTimeout(() => {
    if (phase === "typing") {
      const next = currentPhrase.slice(0, displayText.length + 1);
      setDisplayText(next);

      if (next === currentPhrase) {
        setPhase("pausing");
      }
    } else if (phase === "deleting") {
      const next = currentPhrase.slice(0, displayText.length - 1);
      setDisplayText(next);

      if (next === "") {
        setPhase("pausing");
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else if (phase === "pausing") {
      // Decide whether to start typing or deleting after pause
      if (displayText === "") {
        setPhase("typing");      // start typing next phrase
      } else {
        setPhase("deleting");    // start deleting current phrase
      }
    }
  }, delay);

  return () => clearTimeout(timeout);
}, [displayText, phraseIndex, phase, phrases]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
       <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
       <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-background/75 " /> 
        {/* <div className="absolute inset-0 bg-gradient-to-b from primary/10 via-background/50 to-background" /> */}
      </div> 
       {/* <InteractiveSpiral className="absolute inset-0 z-0" />  */}
      <MeteorShower/>
      <TwinklingStars className="absolute inset-0 z-0 pointer-events-none" count={140} />

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
          
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Elevate Your
            <span className="block text-gradient-gold leading-normal text-3xl sm:text-5xl md:text-7xl pb-0 sm:pb-2">
              {displayText || "\u00A0"}
              {/* <span
                className="border-l-2 border-primary/70 ml-2 animate-pulse"
                aria-hidden="true"
              /> */}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white mb-10 max-w-2xl mx-auto pt-0 sm:pt-2" 
          >
            Where innovation meets elegance. We craft sophisticated digital experiences that transform businesses and captivate audiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/schedule">
              <Button size="lg" className="text-sm sm:text-lg px-8 hover-glow group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="secondary" className="text-sm sm:text-lg px-8 hover-lift">
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
          >
            {[
              { value: "30+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "25+", label: "Infiinos" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-lg text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
