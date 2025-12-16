"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/types/schedule";

type ScheduleStepFourProps = {
  date: string;
  time: string;
  formData: FormValues;
  onBack: () => void;
  onComplete: () => void;
};

export default function ScheduleStepFour({ date, time, formData, onBack, onComplete }: ScheduleStepFourProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-6 bg-transparent"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="mb-4 rounded-full bg-transparent"
        initial={{ rotate: -20 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      </motion.div>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-white gradient-text mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Confirm Your Meeting
      </motion.h2>

      <motion.div
        className="text-gray-300 max-w-md space-y-3 my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p><span className="font-semibold text-cyan-400">Date:</span> {date}</p>
        <p><span className="font-semibold text-cyan-400">Time:</span> {time}</p>
        <p><span className="font-semibold text-cyan-400">Name:</span> {formData.name}</p>
        <p><span className="font-semibold text-cyan-400">Email:</span> {formData.email}</p>
        {formData.phone && <p><span className="font-semibold text-cyan-400">Phone:</span> {formData.phone}</p>}
        {formData.company && <p><span className="font-semibold text-cyan-400">Company:</span> {formData.company}</p>}
        <p><span className="font-semibold text-cyan-400">Service:</span> {formData.service}</p>
        {formData.message && <p><span className="font-semibold text-cyan-400">Message:</span> {formData.message}</p>}
      </motion.div>

      <div className="flex gap-4 mt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={onComplete} size="lg" className="hover-glow bg-cyan-500 hover:bg-cyan-600">
          Confirm Meeting
        </Button>
      </div>
    </motion.div>
  );
}

