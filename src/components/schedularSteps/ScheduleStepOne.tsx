"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";

type ScheduleStepOneProps = {
  onNext: () => void;
  date: string;
  setDate: (value: string) => void;
};

export default function ScheduleStepOne({ onNext, date, setDate }: ScheduleStepOneProps) {
  const [hasSelected, setHasSelected] = useState(false);
  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    if (hasSelected && date) {
      const timeout = setTimeout(() => onNext(), 300);
      return () => clearTimeout(timeout);
    }
  }, [date, hasSelected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-gray-300 space-y-6 w-full mx-auto px-4 py-6 flex justify-center items-center"
    >
      <div className="w-full max-w-fit flex flex-col items-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4">
          Choose a Date
        </h2>

        <div className="rounded-xl border border-cyan-500 p-4 sm:p-6 shadow-inner bg-[#0f172a] flex flex-col md:flex-row items-center gap-6">
          <DayPicker
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(selected) => {
              if (selected) {
                setDate(format(selected, "yyyy-MM-dd"));
                setHasSelected(true);
              }
            }}
            showOutsideDays
            weekStartsOn={0}
            classNames={{
              ...defaultClassNames,
              root: `${defaultClassNames.root} p-2 sm:p-4 rounded-2xl bg-transparent min-w-[320px] md:min-w-0 border border-cyan-500 `,
              day: `p-2 sm:p-3 m-[4px] rounded-full hover:bg-cyan-500 transition-colors text-sm sm:text-base text-white`,
              today: `border-cyan-500`,
              selected: `bg-cyan-500 text-white`,
              caption_label: `text-white text-base sm:text-lg font-semibold`,
              nav: `relative flex items-center justify-between mb-3`,
              nav_button: `text-white hover:text-cyan-300 transition-colors p-1 sm:p-2`,
              nav_icon: `color-white `,
              caption: "absolute left-1/2 transform -translate-x-1/2 z-0",
            }}

          />
          
          {/* Lottie Animation */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-48 lg:w-64">
             <DotLottieReact
      src="https://lottie.host/9981a981-61c0-4a53-ae3b-81d7e31a4cab/uJhSicaZ73.lottie"
      loop
      autoplay
      // style={{ width: "100%", height: "auto" }}
    />
                
            
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
