import React, { useState, useCallback } from 'react';
import { generateTravelTips } from '../services/geminiService';
import { LightbulbIcon } from './icons';

const SimpleMarkdown = ({ text }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
        <>
            {lines.map((line, i) => {
                line = line.trim();
                if (line.startsWith('### ')) {
                    return <h4 key={i} className="text-md font-bold text-slate-200 mt-4 mb-2 first:mt-0">{line.substring(4)}</h4>;
                }
                if (line.startsWith('* ')) {
                    return <li key={i} className="ml-5 list-disc text-slate-300">{line.substring(2)}</li>;
                }
                if (line.match(/\*\*(.*?)\*\*:/)) {
                     const parts = line.split('**:');
                     return <p key={i} className="text-slate-300 my-1"><strong className="font-semibold text-slate-200">{parts[0].replace(/\*\*/g, '')}</strong>:{parts[1]}</p>
                }
                return <p key={i} className="text-slate-300 my-1">{line}</p>;
            })}
        </>
    );
};


const TravelTips = ({ destinationName }) => {
  const [tips, setTips] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [wasClicked, setWasClicked] = useState(false);

  const fetchTips = useCallback(async () => {
    if (isLoading) return;
    setWasClicked(true);
    setIsLoading(true);
    setError('');
    try {
      const result = await generateTravelTips(destinationName);
      setTips(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch tips.');
    } finally {
      setIsLoading(false);
    }
  }, [destinationName, isLoading]);

  const renderContent = () => {
    if (!wasClicked) {
       return (
         <div className="text-center p-4">
            <button
                onClick={fetchTips}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-amber-900 font-bold rounded-lg hover:bg-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-transform transform hover:scale-105 disabled:opacity-50"
                disabled={isLoading}
              >
                <LightbulbIcon className="w-5 h-5" />
                <span>Show Tips for {destinationName}</span>
            </button>
        </div>
       );
    }
    
    if (isLoading) {
       return <p className="text-center text-slate-400 p-4">Fetching tips...</p>
    }
    if (error) {
       return <p className="text-center text-red-500 p-4">{error}</p>
    }
    if (tips) {
        return (
            <div className="bg-amber-950/50 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-lg">
               <SimpleMarkdown text={tips} />
            </div>
        );
    }
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-3 mb-4">
        <LightbulbIcon className="w-7 h-7 text-amber-500" />
        <h3 className="text-2xl font-bold text-slate-100">Travel Tips</h3>
      </div>
      <div className="mt-4 rounded-lg shadow-sm border border-gray-700 bg-gray-800">
        {renderContent()}
      </div>
    </div>
  );
};

export default TravelTips;
