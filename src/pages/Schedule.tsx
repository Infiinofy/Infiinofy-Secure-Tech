import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, User, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import CircularCalendar from "@/components/home/CircularClock";

const Schedule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    timeSlot: "",
    message: "",
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, name: "Select Date", icon: CalendarDays },
    { id: 2, name: "Choose Time", icon: Clock },
    { id: 3, name: "Your Details", icon: User },
  ];

  const handleNext = () => {
    if (currentStep === 1 && !date) {
      toast({
        title: "Please select a date",
        description: "Choose your preferred meeting date to continue.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && !formData.timeSlot) {
      toast({
        title: "Please select a time slot",
        description: "Choose your preferred meeting time to continue.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

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
      timeSlot: "",
      message: "",
    });
    setDate(undefined);
    setCurrentStep(1);
  };

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
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
                {/* Step 1: Select Date */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-300 space-y-6 px-4 py-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-start">
                      {/* Left: Calendar */}
                      <div className="w-full flex flex-col">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6">
                          Choose a Date
                        </h2>

                        <div className="rounded-xl border-2 border-cyan-500 p-6 sm:p-8 shadow-inner w-full bg-[#0f172a]">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            className="w-full"
                            classNames={{
                              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                              month: "space-y-4 w-full",
                              caption: "flex justify-between items-center mb-6",
                              caption_label: "text-xl font-semibold text-white flex-1 text-left",
                              nav: "flex items-center gap-2",
                              nav_button: "h-9 w-9 bg-slate-800 hover:bg-cyan-500 rounded-full transition-all duration-200 text-cyan-400 hover:text-white border-2 border-cyan-500/50 hover:border-cyan-400 shadow-lg",
                              nav_button_previous: "order-1",
                              nav_button_next: "order-2",
                              table: "w-full border-collapse",
                              head_row: "flex w-full justify-between mb-2",
                              head_cell: "text-slate-400 flex-1 text-center font-medium text-sm",
                              row: "flex w-full justify-between mt-2",
                              cell: "flex-1 relative p-0 text-center focus-within:relative focus-within:z-20",
                              day: "h-12 w-12 mx-auto p-0 font-normal hover:bg-cyan-500 hover:text-white rounded-full transition-colors text-base",
                              day_selected: "bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white focus:bg-cyan-500 focus:text-white",
                              day_today: "bg-slate-700 text-white",
                              day_outside: "text-slate-600 opacity-50",
                              day_disabled: "text-slate-600 opacity-30 cursor-not-allowed",
                              day_hidden: "invisible",
                            }}
                          />
                        </div>
                        {date && (
                          <div className="mt-6 space-y-4">
                            <p className="text-lg text-slate-300">
                              Selected: <span className="font-semibold text-cyan-400">{date.toDateString()}</span>
                            </p>
                            <Button onClick={handleNext} size="lg" className="w-full hover-glow">
                              Next Step <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Right: Circular Clock Animation */}
                      <div className="hidden md:flex justify-center items-start w-full pt-12">
                        <div className="h-[450px] w-[450px]">
                          <CircularCalendar />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Select Time */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-8 backdrop-luxury">
                      <div className="flex items-center space-x-2 mb-6">
                        <Clock className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-semibold">Choose Your Time Slot</h3>
                      </div>
                      <div className="space-y-6">
                        <p className="text-slate-300">
                          Meeting date: <span className="font-semibold text-cyan-400">{date?.toDateString()}</span>
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant={formData.timeSlot === slot ? "default" : "outline"}
                              className={`h-16 text-lg ${
                                formData.timeSlot === slot 
                                  ? "bg-cyan-500 hover:bg-cyan-600" 
                                  : "hover:bg-slate-700"
                              }`}
                              onClick={() => setFormData({ ...formData, timeSlot: slot })}
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                        <div className="flex justify-between pt-4">
                          <Button onClick={handleBack} variant="outline" size="lg">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button onClick={handleNext} size="lg" className="hover-glow">
                            Next Step <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: User Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-8 backdrop-luxury">
                      <div className="flex items-center space-x-2 mb-6">
                        <User className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-semibold">Your Details</h3>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-slate-800/50 p-4 rounded-lg mb-6">
                          <p className="text-sm text-slate-300">
                            <span className="font-semibold">Date:</span> {date?.toDateString()}
                          </p>
                          <p className="text-sm text-slate-300">
                            <span className="font-semibold">Time:</span> {formData.timeSlot}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white font-medium">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="bg-slate-700/80 border-slate-600 text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-white font-medium">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="bg-slate-700/80 border-slate-600 text-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white font-medium">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="bg-slate-700/80 border-slate-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-white font-medium">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="bg-slate-700/80 border-slate-600 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service" className="text-white font-medium">Service Interested In *</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => setFormData({ ...formData, service: value })}
                            required
                          >
                            <SelectTrigger className="bg-slate-700/80 border-slate-600 text-white">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="erp">ERP Implementation</SelectItem>
                              <SelectItem value="automation">Automation</SelectItem>
                              <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                              <SelectItem value="app-dev">App Development</SelectItem>
                              <SelectItem value="graphic-design">Graphic Design</SelectItem>
                              <SelectItem value="web-dev">Web Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-white font-medium">Additional Information</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={4}
                            className="bg-slate-700/80 border-slate-600 text-white"
                            placeholder="Tell us about your project..."
                          />
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button onClick={handleBack} variant="outline" size="lg" type="button">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button type="submit" size="lg" className="hover-glow">
                            Schedule Meeting
                          </Button>
                        </div>
                      </form>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative Clock */}
              {/* <div className="mt-12 flex justify-center">
                <div className="h-[400px] w-[250px]">
                  <CircularCalendar />
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
