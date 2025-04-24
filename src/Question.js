import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onAnswered(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onAnswered]);

  return (
    <div>
      <h2>{question.prompt}</h2>
      <p>{timeLeft} seconds remaining</p>
    </div>
  );
}

export default Question;
