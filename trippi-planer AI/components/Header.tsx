import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-950/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-white">Trippi</span>
            <span className="text-brand">- Planner</span>
          </h1>
          <p className="text-slate-400 hidden md:block">Your personalized travel assistant</p>
        </div>
      </div>
    </header>
  );
};

export default Header;