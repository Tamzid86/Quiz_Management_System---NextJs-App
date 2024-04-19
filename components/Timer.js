import { useState, useEffect } from 'react';

const Timer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        onComplete();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return <div>Time Left: {timeLeft} seconds</div>;
};

export default Timer;
