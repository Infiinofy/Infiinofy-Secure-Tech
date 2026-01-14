import { motion } from "framer-motion";
import LogoGlobe from "./LogoGlobe";

const About = () => {

  return (
    <section id="about" className="py-24 relative overflow-hidden">
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
              About INFIINOFY
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
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                    <p className="text-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Animated Globe */}
          <LogoGlobe />
        </div>
      </div>
    </section>
  );
};

export default About;

