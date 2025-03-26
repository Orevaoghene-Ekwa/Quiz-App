import React, { useState, useEffect, useRef } from "react";

function Stopwatch({ duration, isRunning, onFinish }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      setTimeLeft(duration); // Reset the timer when it starts
      intervalIdRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalIdRef.current);
            onFinish(); // Call the onFinish function when the timer reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, duration, onFinish]);

  function formatTime() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="5" fill="white"/>
          <line x1="50" y1="50" x2="50" y2="20" stroke="black" stroke-width="4" />
          <circle cx="50" cy="50" r="3" fill="black"/>
          <rect x="45" y="10" width="10" height="10" fill="black"/>
          <line x1="50" y1="50" x2="70" y2="30" stroke="red" stroke-width="3" />
        </svg>
      </div>
      {formatTime()}
    </div>
  );
}

export default Stopwatch;
