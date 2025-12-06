import React, { useState, useEffect } from "react";
import "../../CircularCalendar.css";

const CircularCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0); // For the fade-in animation sequence

  // Strings for the rings
  const dayNamesStr = "MON TUE WED THU FRI SAT SUN";
  const monthsStr = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC";
  // Generate string "01 02 ... 31"
  const daysStr = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  ).join(" ");

  useEffect(() => {
    // Start clock timer
    const timerID = setInterval(() => tick(), 1000);
    setMounted(true);

    // Initial Animation Sequence to match original jQuery fadeTo delays
    setTimeout(() => setStep(1), 500); // Show Date
    setTimeout(() => setStep(2), 1000); // Show Month + Side widgets
    setTimeout(() => setStep(3), 1500); // Show Day Name
    setTimeout(() => setStep(4), 2000); // Show Center Clock

    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  // --- Helper Logic for Rotations ---

  const getRingRotation = (value, totalSections, range = 270) => {
    // Logic ported from original rotateRing function
    // value is 1-based index
    const sectionWidth = range / totalSections;
    const initialRotation = 135 - sectionWidth / 2;
    const rotateAmount = initialRotation - sectionWidth * (value - 1);
    return rotateAmount;
  };

  // Helper to split text and highlight active characters
  const renderRingText = (text, activeIndex, charsPerSection, color) => {
    // activeIndex is 1-based.
    // The original logic: var start = characters * (input - 1) + (input - 1) + 1;
    // This logic accounts for the space between words.
    const startCharIndex =
      charsPerSection * (activeIndex - 1) + (activeIndex - 1); // 0-based index for React

    return text.split("").map((char, index) => {
      // Logic to determine if this specific character should be colored
      // We check if the current index is within the range of the active block
      const isActive =
        index >= startCharIndex && index < startCharIndex + charsPerSection;

      return (
        <span
          key={index}
          className={`char${index + 1}`} // Keep charX classes for CSS rotation
          style={{ color: isActive ? color : undefined }}
        >
          {char}
        </span>
      );
    });
  };

  // --- Derived State for UI ---

  // 1. Time for hands
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const secondsDeg = seconds * 6;
  const minutesDeg = minutes * 6;
  const hoursDeg = hours * 30 + minutes / 2;

  // 2. Date info
  const currentDayNum = date.getDate(); // 1-31
  let currentDayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)
  if (currentDayOfWeek === 0) currentDayOfWeek = 7; // Convert to 1-7 format where 7 is Sun to match CSS ring
  const currentMonth = date.getMonth() + 1; // 1-12

  // 3. Rotations
  const dayRingRot = getRingRotation(currentDayNum, 31);
  const monthRingRot = getRingRotation(currentMonth, 12);
  const dayNameRingRot = getRingRotation(currentDayOfWeek, 7);

  // 4. Bar heights (randomize once on mount like original)
  const [bars] = useState(() =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 85) + 5)
  );

  return (
    <div className="calendar-container">
        {/* External Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Mono"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
        />

      {/* --- Center Dial (Clock) --- */}
      <div
        className="center-dial"
        style={{
          opacity: step >= 4 ? 1 : 1 // Logic says fadeTo 0 then hand container fades in. Keeping simple opacity logic.
        }}
      >
        <h1
          className="center-preview"
          style={{ opacity: step >= 4 ? 0 : 1 }}
        >
          HELLO
        </h1>
        <div className="head" style={{ opacity: step >= 4 ? 0 : 1 }}></div>
        <div className="torso" style={{ opacity: step >= 4 ? 0 : 1 }}></div>
        
        {/* Hands Container */}
        <div className="hand-container-wrapper" style={{ opacity: step >= 4 ? 1 : 0, transition: 'opacity 0.5s' }}>
            <div
            className="hand-container"
            id="minutes"
            style={{ transform: `rotate(${minutesDeg}deg)` }}
            >
            <div className="minute-hand"></div>
            </div>
            <div
            className="hand-container"
            id="hours"
            style={{ transform: `rotate(${hoursDeg}deg)` }}
            >
            <div className="hour-hand"></div>
            </div>
            <div
            className="hand-container"
            id="seconds"
            style={{ transform: `rotate(${secondsDeg}deg)` }}
            >
            <div className="second-hand"></div>
            </div>
        </div>
      </div>

      {/* --- Ring 1: Day Name (Mon, Tue...) --- */}
      <div className="day-name-dial">
        <div className="ring-back"></div>
        <div
          className="ring"
          id="r1"
          style={{ transform: `rotate(${dayNameRingRot}deg)` }}
        >
          <h1
            className="day-name-preview"
            style={{ opacity: step >= 3 ? 0 : 1 }}
          >
            DAY NAME
          </h1>
          <h2
            className="day-name-text"
            style={{ opacity: step >= 3 ? 1 : 0 }}
          >
            {renderRingText(dayNamesStr, currentDayOfWeek, 3, "#4CD964")}
          </h2>
        </div>
      </div>

      {/* --- Ring 2: Month --- */}
      <div className="month-dial">
        <div className="ring-back"></div>
        <div
          className="ring"
          id="r2"
          style={{ transform: `rotate(${monthRingRot}deg)` }}
        >
          <h1 className="month-preview" style={{ opacity: step >= 2 ? 0 : 1 }}>
            MONTH
          </h1>
          <h2 className="month-text" style={{ opacity: step >= 2 ? 1 : 0 }}>
            {renderRingText(monthsStr, currentMonth, 3, "#007AFF")}
          </h2>
        </div>
      </div>

      {/* --- Ring 3: Day Number (01, 02...) --- */}
      <div className="day-dial">
        <div className="ring-back"></div>
        <div
          className="ring"
          id="r3"
          style={{ transform: `rotate(${dayRingRot}deg)` }}
        >
          <h1 className="day-preview" style={{ opacity: step >= 1 ? 0 : 1 }}>
            DAY
          </h1>
          <h2 className="day-text" style={{ opacity: step >= 1 ? 1 : 0 }}>
            {renderRingText(daysStr, currentDayNum, 2, "#FF2D55")}
          </h2>
        </div>
      </div>

      {/* --- Side Widget: Weather --- */}
      <div className="side-ring" id="weather">
        <div
          className="fa fa-cloud"
          style={{ opacity: step >= 2 ? 1 : 0 }}
        ></div>
        <p className="temperature" style={{ opacity: step >= 2 ? 1 : 0 }}>
          14&#176;C
        </p>
      </div>

      {/* --- Side Widget: Steps/Bars --- */}
      <div className="side-ring" id="steps">
        <div className="bars" style={{ opacity: step >= 2 ? 1 : 0 }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div className="bar" key={i}>
              <div className="day-letter">{d}</div>
              <div
                className="x"
                id={`x${i + 1}`}
                style={{ height: `${bars[i]}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularCalendar;