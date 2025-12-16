import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, User, CheckCircle2 } from "lucide-react";
import ScheduleStepOne from "@/components/schedularSteps/ScheduleStepOne";
import ScheduleStepTwo from "@/components/schedularSteps/ScheduleStepTwo";
import ScheduleStepThree from "@/components/schedularSteps/ScheduleStepThree";
import ScheduleStepFour from "@/components/schedularSteps/ScheduleStepFour";

const Schedule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, name: "Select Date", icon: CalendarDays },
    { id: 2, name: "Choose Time", icon: Clock },
    { id: 3, name: "Your Details", icon: User },
    { id: 4, name: "Confirmation", icon: CheckCircle2 },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    toast({
      title: "Meeting Scheduled! ✨",
      description: "We'll send you a confirmation email shortly.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
    setDate("");
    setTime("");
    setCurrentStep(1);
  };

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
                Schedule a <span className="text-gradient-gold">Meeting</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Book a free consultation to discuss your project and explore how we can help
              </p>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto mt-12"
            >
              <div className="flex items-center justify-between relative">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep > step.id
                            ? "bg-green-500"
                            : currentStep === step.id
                            ? "bg-cyan-500"
                            : "bg-slate-700"
                        }`}
                        animate={{ scale: currentStep === step.id ? 1.1 : 1 }}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        ) : (
                          <step.icon className="w-6 h-6 text-white" />
                        )}
                      </motion.div>
                      <p className={`mt-2 text-sm font-medium ${
                        currentStep >= step.id ? "text-white" : "text-slate-400"
                      }`}>
                        {step.name}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute top-6 left-1/2 w-full h-0.5 bg-slate-700 -z-10">
                        <motion.div
                          className="h-full bg-cyan-500"
                          initial={{ width: 0 }}
                          animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <ScheduleStepOne onNext={handleNext} date={date} setDate={setDate} />
                )}

                {currentStep === 2 && (
                  <ScheduleStepTwo onNext={handleNext} time={time} setTime={setTime} />
                )}

                {currentStep === 3 && (
                  <ScheduleStepThree 
                    onNext={handleNext} 
                    onBack={handleBack}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}

                {currentStep === 4 && (
                  <ScheduleStepFour 
                    date={date}
                    time={time}
                    formData={formData}
                    onBack={handleBack}
                    onComplete={handleComplete}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
