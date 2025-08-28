import React, { useState, useCallback } from 'react';
import type { TripPreferences, ItineraryPlan } from './types';
import { generateItinerary } from './services/geminiService';
import Header from './components/Header';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (preferences: TripPreferences) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-900"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/subtle-zebra-3d.png')`,
      }}
    >
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center">
          <div className="text-center mb-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              Generate your Dreams
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Tell us your travel dreams, and our AI-powered planner will build a custom itinerary just for you.
            </p>
          </div>
          
          <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-12">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="mt-12 bg-red-900/50 border-l-4 border-red-500 text-red-300 p-4 w-full max-w-4xl rounded-r-lg" role="alert">
              <p className="font-bold text-red-200">Oops! An error occurred.</p>
              <p className="whitespace-pre-wrap">{error}</p>
            </div>
          )}

          {itinerary && (
            <div className="w-full max-w-4xl">
              <ItineraryDisplay itinerary={itinerary} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6">
        <p className="text-slate-400 text-sm">&copy; 2024 Trippi-Planner. Happy Travels!</p>
      </footer>
    </div>
  );
};

export default App;
