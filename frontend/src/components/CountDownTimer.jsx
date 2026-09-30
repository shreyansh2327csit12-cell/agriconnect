import { useState, useEffect } from "react";

function CountdownTimer({ initialTimeInMs }) {
  const [timeLeft, setTimeLeft] = useState(initialTimeInMs);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert milliseconds to hours, minutes, seconds
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Add leading zeros
  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="bg-muted rounded-md p-2">
        <p className="text-2xl font-bold">{formatNumber(hours)}</p>
        <p className="text-xs text-muted-foreground">Hours</p>
      </div>
      <div className="bg-muted rounded-md p-2">
        <p className="text-2xl font-bold">{formatNumber(minutes)}</p>
        <p className="text-xs text-muted-foreground">Minutes</p>
      </div>
      <div className="bg-muted rounded-md p-2">
        <p className="text-2xl font-bold">{formatNumber(seconds)}</p>
        <p className="text-xs text-muted-foreground">Seconds</p>
      </div>
    </div>
  );
}

export default CountdownTimer;
