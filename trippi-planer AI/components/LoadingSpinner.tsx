import React, { useState, useEffect } from 'react';

const TIPS = [
  "Checking the best flight deals...",
  "Finding the hidden gems...",
  "Packing the virtual bags...",
  "Consulting the local guides...",
  "Mapping out your adventure...",
  "Translating the local greetings...",
  "Booking the window seat...",
  "Discovering the best photo spots...",
];

const LoadingSpinner: React.FC = () => {
  const [tip, setTip] = useState(TIPS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTip(prevTip => {
        const currentIndex = TIPS.indexOf(prevTip);
        const nextIndex = (currentIndex + 1) % TIPS.length;
        return TIPS[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand"></div>
      <div>
        <p className="text-xl text-slate-200 font-medium">Crafting your perfect journey...</p>
        <p className="text-base text-slate-400 font-normal mt-2 h-5 transition-opacity duration-300">
            {tip}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
