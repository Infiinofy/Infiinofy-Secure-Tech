import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Parshwa Enterprice",
      role: "Owner",
      content: "The petrol pump management system by Infiinofy made our daily work much easier. Inventory, sales, and staff details are all in one place now. It saves time, reduces errors, and works smoothly. Highly recommended.",
      rating: 5,
    },
    {
      name: "SwamiRaj Media",
      role: "Owner",
      content: "We are very happy with the website developed for Swamiraj Media. The design is clean, professional, and perfectly represents our brand. The site loads fast and looks great on all devices.",
      rating: 5,
    },
    {
      name: "Pushpak Jewellers",
      role: "Owner",
      content: "Infiinofy built a desktop invoice app that’s fast, easy to use, and perfect for our custom jewellery orders. It’s really improved our daily work. Looking forward to working with them again!",
      rating: 5,
    },
     {
      name: "Arihant Jewellers",
      role: "Owner",
      content: "Infiinofy created a beautiful and responsive e-commerce site for us. It’s easy to manage, has secure payments, and real-time order tracking works great. Our customers love the experience. Would definitely work with them again!",
      rating: 5,
    },
     {
      name: "Atlas Imitation",
      role: "Owner",
      content: "Infiinofy did an excellent job building our Shopify store for Atlas Imitation. The website looks premium, runs smoothly, and has significantly improved our online presence.",
      rating: 5,
    },
  ];

  // Duplicate for seamless marquee loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient-gold">Testimonials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it, hear from businesses we've helped succeed
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex gap-6 w-max">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[450px] lg:w-[500px]"
              >
                <Card className="p-8 h-full backdrop-luxury hover-lift transition-all duration-300">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-auto">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .animate-marquee {
            animation: scroll-marquee 25s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }

          @keyframes scroll-marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;
