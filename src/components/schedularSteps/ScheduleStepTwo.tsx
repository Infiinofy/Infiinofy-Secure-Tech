import { motion } from "framer-motion";

type ScheduleStepTwoProps = {
  onNext: () => void;
  time: string;
  setTime: (value: string) => void;
};

export default function ScheduleStepTwo({
  onNext,
  time,
  setTime,
}: ScheduleStepTwoProps) {
  const slots = [
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "12:00 PM - 12:30 PM",
    "12:30 PM - 01:00 PM",
    "01:00 PM - 01:30 PM",
    "01:30 PM - 02:00 PM",
    "02:00 PM - 02:30 PM",
    "02:30 PM - 03:00 PM",
    "03:00 PM - 03:30 PM",
    "03:30 PM - 04:00 PM",
    "04:00 PM - 04:30 PM",
    "04:30 PM - 05:00 PM",
    "05:00 PM - 05:30 PM",
    "05:30 PM - 06:00 PM",
  ];

  return (
    <div className="space-y-4 text-gray-300">
      <h2 className="text-xl sm:text-2xl font-semibold">Select a Time Slot</h2>

      <style>{`
        .time-slots-container::-webkit-scrollbar {
          width: 6px;
        }
        .time-slots-container::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 8px;
        }
        .time-slots-container::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>

      <div
        className="time-slots-container grid grid-cols-2 gap-4 overflow-y-auto max-h-[1000px] pr-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4B5563 transparent",
        }}
      >
        {slots.map((slot) => {
          const isSelected = slot === time;

          return (
            <motion.button
              key={slot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setTime(slot);
                onNext();
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-300
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30"
                    : "bg-[hsl(222,30%,10%)] text-gray-300 border-gray-600 hover:border-cyan-400"
                }`}
            >
              {slot}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
