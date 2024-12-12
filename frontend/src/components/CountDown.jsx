import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expirationDate = new Date(targetDate);
      const difference = expirationDate - now;

      if (difference <= 0) {
        setTimeRemaining("Expired");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const now = new Date();
  const expirationDate = new Date(targetDate);
  const difference = expirationDate - now;

  let textColor = "text-green-500";
  if (difference <= 1000 * 60 * 60 * 5) {
    textColor = "text-red-500"; // Less than 5 hours
  } else if (difference <= 1000 * 60 * 60 * 24) {
    textColor = "text-yellow-500"; // Less than 1 day
  }

  return <p className={`${textColor} text-center`}>{timeRemaining}</p>;
};

export default Countdown;
