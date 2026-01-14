import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import aboutVisual from "@/assets/Enhanced bg removed.png";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to delivering solutions that make a real impact on your business success.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your goals are our goals. We prioritize your needs and build lasting partnerships.",
    },
    {
      icon: Award,
      title: "Excellence First",
      description: "We maintain the highest standards in every project, from concept to delivery.",
    },
    {
      icon: TrendingUp,
      title: "Innovation Focus",
      description: "We stay ahead of trends to provide cutting-edge solutions that future-proof your business.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About <span className="text-gradient-gold">INFIINOFY</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We are a team of passionate innovators, designers, and developers dedicated to creating exceptional digital experiences that drive business growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6">Our <span className="text-gradient-gold">Story</span> </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-base sm:text-lg md:text-xl text-left sm:text-justify">
                    INFIINOFY doesn&apos;t just represent infinity it creates it. We believe that we grow when we help you grow. Built on passion, curiosity, and purpose, INFIINOFY exists to turn ideas into impactful digital solutions that move businesses forward.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-left sm:text-justify">
                    Our name defines who we are. <strong>Infi</strong> stands for infinite possibilities, <strong>Ino</strong> represents innovation, and <strong>fy</strong> means to make things happen. Together, INFIINOFY means to make <em>infinite innovation happen.</em> We&apos;re not just developers we&apos;re <strong>Infiinos</strong>, infinite innovators who think beyond code to build meaningful, future-ready experiences.
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-left sm:text-justify">
                   The falling star on our website represents your dream the vision you want to bring to life. Just like a wish made on a falling star, we&apos;re here to help turn your ideas into reality. When your dream grows, we grow with you and that&apos;s the heart of INFIINOFY.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative pl-0 xl:pl-8">
                  <img
                    src={aboutVisual}
                    alt="Modern office workspace"
                    //className="rounded-2xl shadow-2xl hover-lift "
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-2xl" /> */}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our <span className="text-gradient-gold">Values</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-8 backdrop-luxury hover-lift h-full">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-gradient-gold">Team</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A diverse group of experts united by a passion for digital excellence
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              
              className="flex flex-row justify-center gap-8 sm:gap-12 md:gap-20"
             
            >
              {/* className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-4xl mx-auto" */}
              {[
                { count: "25+", label: "Team Members" },
                { count: "10+", label: "Countries" },
                { count: "100%", label: "Remote-Friendly" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                    {stat.count}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
