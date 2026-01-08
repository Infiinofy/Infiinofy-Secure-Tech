import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CircularClock from "./CircularClock";

const ValueProposition = () => {
  const benefits = [
    "Industry-leading expertise with 10+ years experience",
    "Agile methodology ensuring on-time delivery",
    "Dedicated support throughout your journey",
    "Scalable solutions that grow with your business",
    "Cutting-edge technology stack",
    "ROI-focused approach to every project",
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center justify-center text-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient-gold">INFIINOFY</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 ">
              We don't just build products, we craft experiences that resonate with your audience and drive measurable results.
            </p>

            <div className="space-y-4 flex flex-col items-center">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3 w-full max-w-md justify-start"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Circular Clock Animation
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square">
              <CircularClock />
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
