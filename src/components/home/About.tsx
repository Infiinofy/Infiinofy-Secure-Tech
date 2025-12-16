import { useMemo } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const logoFiles = [
  "zoho.webp",
  "crm.png",
  "books.png",
  "desk.png",
  "inventory.png",
  "campaign.png",
  "flow.png",
  "commerce.png",
  "backstage.png",
  "begin.png",
  "calender.png",
  "catalyst.png",
  "checkout.png",
  "cliq.png",
  "expenses.png",
  "forms.png",
  "invoices.png",
  "mails.png",
  "meetings.png",
  "payroll.png",
  "recruit.png",
  "salesIQ.png"
];

const otherLogos = [
  "Android.png",
  "production-automation.png",
  "Reactjs-removebg-preview.png",
  "web-development.png",
  "Figma-logo.svg.png",
  "11-114612_apple-logo-png-ios-6-apple-logo.png",
  "1656733637logo-canva-png.png"
];

const outerRadiusPercent = 48;
const innerRadiusPercent = 32;

const About = () => {
  const isMobile = useIsMobile();
  
  const { outerLogos, innerLogos } = useMemo(() => {
    // Start from -90 degrees (top) and evenly distribute
    const startAngle = -Math.PI / 2;
    
    const outer = logoFiles.map((file, idx) => {
      const angle = startAngle + (idx / logoFiles.length) * Math.PI * 2;
      const x = 50 + outerRadiusPercent * Math.cos(angle);
      const y = 50 + outerRadiusPercent * Math.sin(angle);
      return { file, x, y };
    });

    const inner = otherLogos.map((file, idx) => {
      const angle = startAngle + (idx / otherLogos.length) * Math.PI * 2;
      const x = 50 + innerRadiusPercent * Math.cos(angle);
      const y = 50 + innerRadiusPercent * Math.sin(angle);
      return { file, x, y };
    });

    return { outerLogos: outer, innerLogos: inner };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              About ShreeJin Tech
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              We build future-ready experiences on{" "}
              <span className="text-gradient-gold">Zoho One</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From CRM to Analytics, we orchestrate the entire Zoho One suite to
              streamline your operations, automate customer journeys, and launch
              scalable digital products. Our architects design resilient
              platforms, while our engineers deliver secure, performant
              implementations tailored to your roadmap.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "End-to-end Zoho One strategy & implementation",
                "Custom extensions, APIs, and workflow automation",
                "Data governance, security, and observability baked in",
                "Launch-ready playbooks with 24/7 support",
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-card/50 border border-border/60 shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                    <p className="text-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Animated Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-xl mx-auto aspect-square"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-background blur-3xl z-0" />

            <div className="absolute inset-0 rounded-full border border-primary/20 z-10" />
            <div className="absolute inset-6 rounded-full border border-secondary/20 z-10" />

            {/* Outer Circle - Zoho Logos */}
            <motion.div
              className="absolute inset-0 z-20"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: isMobile ? 45 : 28,
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {outerLogos.map((logo) => (
                <div
                  key={logo.file}
                  className="absolute flex items-center justify-center z-20"
                  style={{
                    left: `${logo.x}%`,
                    top: `${logo.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: isMobile ? 45 : 28,
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <div className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} rounded-full bg-card/90 border border-border/70 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] flex items-center justify-center backdrop-blur-sm z-20`}>
                      <img
                        src={`/Logos/${logo.file}`}
                        alt={`${logo.file} logo`}
                        className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} object-contain relative z-20`}
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== `${window.location.origin}/Logos/zoho.webp`) {
                            target.src = "/Logos/zoho.webp";
                          } else {
                            target.style.display = "none";
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Inner Circle - Other Logos */}
            <motion.div
              className="absolute inset-0 z-20"
              animate={{ rotate: -360 }}
              transition={{ 
                duration: isMobile ? 36 : 22,
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {innerLogos.map((logo) => (
                <div
                  key={logo.file}
                  className="absolute flex items-center justify-center z-20"
                  style={{
                    left: `${logo.x}%`,
                    top: `${logo.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: isMobile ? 36 : 22,
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <div className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} rounded-full bg-card/90 border border-border/70 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] flex items-center justify-center backdrop-blur-sm z-20`}>
                      <img
                        src={`/other logos/${logo.file}`}
                        alt={`${logo.file} logo`}
                        className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} object-contain relative z-20`}
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-10 rounded-full border border-primary/15 z-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute inset-16 rounded-full bg-gradient-to-b from-primary/10 via-background to-background/80 backdrop-blur-xl border border-primary/10 z-10" />

            <motion.div
              className="absolute inset-24 rounded-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 blur-xl z-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute inset-28 rounded-full bg-background/60 border border-border/60 flex items-center justify-center text-center px-8 z-30">
              <div>
                {/* <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  Zoho One Specialists
                </p> */}
                <p className="lg:text-2xl sm:text-sm font-semibold text-gradient-gold">
                  Integrated. Automated. Secure.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

