import React, { useState, useRef, useEffect } from 'react';
import type { TripPreferences } from '../types';
import { BUDGET_OPTIONS, TRAVEL_WITH_OPTIONS, ADVENTURE_TYPE_OPTIONS } from '../constants';
import { CheckIcon, MapPinIcon } from './icons';

interface TripFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  isLoading: boolean;
}

interface GeoapifyFeature {
  properties: {
    formatted: string;
    place_id: string;
  };
}

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
        {children}
    </div>
);

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState<TripPreferences>({
    location: "Manali, HP, India",
    days: "3",
    budget: "premium",
    travelWith: "couple",
    adventureTypes: ["Sightseeing Tours", "Temple & Culture Visits", "Wellness & Peace Retreats", "Food Trails & Cooking Fun"],
  });

  const [locationQuery, setLocationQuery] = useState(preferences.location);
  const [suggestions, setSuggestions] = useState<GeoapifyFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const locationInputRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setLocationQuery(query);
      setPreferences(prev => ({ ...prev, location: query }));

      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
      }

      if (query.length < 2) {
          setSuggestions([]);
          setShowSuggestions(false);
          setIsSuggestionsLoading(false);
          return;
      }
      
      setShowSuggestions(true);
      setIsSuggestionsLoading(true);

      timeoutRef.current = window.setTimeout(() => {
          const GEOAPIFY_API_KEY = "39f8a7b8be8d4070b7c21a2d3f258cfe";
          fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&type=city&apiKey=${GEOAPIFY_API_KEY}`)
              .then(res => res.json())
              .then(data => {
                  setSuggestions(data.features || []);
              })
              .catch(err => {
                  console.error("Error fetching suggestions:", err);
                  setSuggestions([]);
              })
              .finally(() => {
                  setIsSuggestionsLoading(false);
              });
      }, 400);
  };

  const handleSuggestionClick = (suggestion: GeoapifyFeature) => {
      setLocationQuery(suggestion.properties.formatted);
      setPreferences(prev => ({ ...prev, location: suggestion.properties.formatted }));
      setSuggestions([]);
      setShowSuggestions(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBudgetChange = (value: TripPreferences['budget']) => {
    setPreferences(prev => ({ ...prev, budget: value }));
  };
  
  const handleTravelWithChange = (value: TripPreferences['travelWith']) => {
    setPreferences(prev => ({ ...prev, travelWith: value }));
  };

  const handleAdventureTypeChange = (type: string) => {
    setPreferences(prev => {
      const newTypes = prev.adventureTypes.includes(type)
        ? prev.adventureTypes.filter(t => t !== type)
        : [...prev.adventureTypes, type];
      return { ...prev, adventureTypes: newTypes };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (preferences.adventureTypes.length === 0) {
        alert("Please select at least one type of adventure.");
        return;
    }
    onSubmit(preferences);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormSection title="Destination">
              <div className="relative" ref={locationInputRef}>
                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPinIcon className="h-5 w-5 text-slate-400" />
                  </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={locationQuery}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition text-white placeholder:text-gray-400"
                  placeholder="Type a location..."
                  required
                  autoComplete="off"
                />
                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isSuggestionsLoading ? (
                      <div className="px-4 py-3 text-slate-400 text-center">Loading...</div>
                    ) : suggestions.length > 0 ? (
                      <ul>
                        {suggestions.map((feature) => (
                          <li key={feature.properties.place_id}>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 hover:bg-brand-light transition-colors duration-150"
                              onClick={() => handleSuggestionClick(feature)}
                            >
                              {feature.properties.formatted}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      locationQuery.length >= 2 && <div className="px-4 py-3 text-slate-400 text-center">No locations found.</div>
                    )}
                  </div>
                )}
              </div>
            </FormSection>
            <FormSection title="Trip Duration (days)">
              <input
                type="number"
                id="days"
                name="days"
                value={preferences.days}
                onChange={handleInputChange}
                min="1"
                max="14"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition text-white"
                placeholder="e.g. 4"
                required
              />
            </FormSection>
        </div>

        <FormSection title="What is your budget?">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BUDGET_OPTIONS.map(({value, label, range, icon: Icon}) => {
                    const isSelected = preferences.budget === value;
                    return (
                        <button type="button" key={value} onClick={() => handleBudgetChange(value)} className={`text-left p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 active:scale-100 ${isSelected ? 'border-brand bg-brand-light shadow-md' : 'border-gray-600 bg-gray-700 hover:border-brand'}`}>
                            <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-brand' : 'text-slate-400'}`} />
                            <p className="font-semibold text-slate-200">{label}</p>
                            <p className="text-sm text-slate-400">{range}</p>
                        </button>
                    )
                })}
            </div>
        </FormSection>
        
        <FormSection title="Who do you plan on traveling with on your next adventure?">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TRAVEL_WITH_OPTIONS.map(({value, label, icon: Icon}) => {
                     const isSelected = preferences.travelWith === value;
                     return (
                         <button type="button" key={value} onClick={() => handleTravelWithChange(value)} className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 active:scale-100 ${isSelected ? 'border-brand bg-brand-light shadow-md' : 'border-gray-600 bg-gray-700 hover:border-brand'}`}>
                            <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-brand' : 'text-slate-400'}`} />
                            <p className="font-semibold text-slate-200">{label}</p>
                         </button>
                     )
                })}
            </div>
        </FormSection>

        <FormSection title="What type of adventure do you want to include in your trip?">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ADVENTURE_TYPE_OPTIONS.map(type => {
              const isSelected = preferences.adventureTypes.includes(type);
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => handleAdventureTypeChange(type)}
                  className={`flex items-center justify-center text-center p-3 text-sm font-medium rounded-lg transition-all duration-200 border-2 transform hover:scale-105 active:scale-100
                    ${isSelected 
                      ? 'bg-brand text-white border-brand shadow-md' 
                      : 'bg-gray-700 text-slate-300 border-gray-600 hover:border-brand hover:bg-brand-light'}`
                  }
                >
                  {isSelected && <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />}
                  <span className="capitalize">{type}</span>
                </button>
              );
            })}
          </div>
        </FormSection>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand text-white font-bold py-4 px-4 rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand focus:ring-opacity-50 transition-transform transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center text-lg"
          >
            {isLoading ? 'Creating Your Plan...' : 'Generate Trip'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;