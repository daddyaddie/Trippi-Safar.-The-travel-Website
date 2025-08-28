import React from 'react';

const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M10.5 14.25h3m-6.75 6h10.5c.621 0 1.125-.504 1.125-1.125v-7.5c0-.621-.504-1.125-1.125-1.125h-10.5c-.621 0-1.125.504-1.125 1.125v7.5c0 .621.504 1.125 1.125 1.125Z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 6.75v3" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M10.5 3h3c.621 0 1.125.504 1.125 1.125v.75c0 .621-.504 1.125-1.125 1.125h-3c-.621 0-1.125-.504-1.125-1.125v-.75C9.375 3.504 9.879 3 10.5 3Z" 
    />
  </svg>
);

export default LightbulbIcon;
