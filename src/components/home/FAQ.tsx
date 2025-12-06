import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a comprehensive range of IT services including ERP Implementation (Zoho One, CRM Plus, Odoo), Automation solutions, Digital Marketing (SEO, Social Media, Paid Ads), App Development (Android & iOS), Graphic Design, and Web Development (WordPress, Wix, Shopify, Custom solutions).",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on complexity and scope. A simple website can take 2-4 weeks, while complex ERP implementations may take 2-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process.",
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, updates, performance monitoring, and technical assistance. We believe in building long-term partnerships with our clients.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "Our pricing is project-based and tailored to your specific needs. We provide transparent quotes after understanding your requirements. We offer flexible payment plans and ensure no hidden costs. Contact us for a free consultation and quote.",
    },
    {
      question: "Can you integrate with our existing systems?",
      answer:
        "Absolutely! We specialize in system integrations using APIs, webhooks, and automation tools like Zapier. Whether it's connecting your CRM to marketing tools or integrating payment gateways, we ensure seamless data flow across your platforms.",
    },
    {
      question: "Do you work with startups and small businesses?",
      answer:
        "Yes, we work with businesses of all sizes! We understand the unique challenges startups and small businesses face. We offer scalable solutions that grow with your business and provide cost-effective packages tailored to your budget.",
    },
    {
      question: "What makes your team different from other IT service providers?",
      answer:
        "We combine technical expertise with a client-first approach. Our team stays updated with the latest technologies, we provide personalized solutions (not one-size-fits-all), maintain transparent communication, and deliver projects on time. We're invested in your success.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply click 'Get Started' or 'Schedule Meeting' to book a free consultation. We'll discuss your needs, provide recommendations, and create a customized proposal. No obligation—just expert advice tailored to your goals.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E293B]/30 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="backdrop-blur-sm bg-white/5 border border-slate-700/50 rounded-lg px-6 hover:bg-white/10 transition-colors"
              >
                <AccordionTrigger className="text-left text-white hover:text-cyan-400 py-5">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pb-5 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            Contact us directly →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
