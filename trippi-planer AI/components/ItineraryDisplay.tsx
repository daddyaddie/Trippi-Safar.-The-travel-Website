import React from 'react';
import type { ItineraryPlan, Activity, Hotel } from '../types';
import { 
    StarIcon, 
    ClockIcon, 
    TicketIcon, 
    MapPinIcon, 
    BuildingOfficeIcon 
} from './icons';
import DynamicImage from './DynamicImage';
import TravelTips from './TravelTips';

interface ItineraryDisplayProps {
  itinerary: ItineraryPlan;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="flex items-start space-x-2 text-sm text-slate-300">
        <div className="flex-shrink-0 pt-0.5">{icon}</div>
        <div>
          <span className="font-medium">{label}:</span>
          <span className="pl-1">{value}</span>
        </div>
    </div>
);

const ActivityCard: React.FC<{ activity: Activity, destinationName: string }> = ({ activity, destinationName }) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activity.name}, ${destinationName}`)}`;

    return (
        <div className="relative pl-8">
            <div className="absolute left-0 top-1.5 w-4 h-4 bg-brand-light rounded-full border-4 border-gray-800"></div>
            <div className="absolute left-[7px] top-5 h-full border-l-2 border-dashed border-gray-600"></div>

            <div className="mb-8">
                <p className="text-sm font-semibold text-brand mb-2">{activity.timeOfDay}</p>
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-700 space-y-4">
                    <div>
                        <h4 className="font-bold text-xl text-slate-100">{activity.name}</h4>
                        <p className="text-slate-300 mt-1">{activity.description}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-gray-700">
                       <DetailItem icon={<StarIcon className="w-4 h-4 text-amber-500" />} label="Rating" value={activity.rating} />
                       <DetailItem icon={<ClockIcon className="w-4 h-4 text-sky-500" />} label="Hours" value={activity.openingHours} />
                       <DetailItem icon={<TicketIcon className="w-4 h-4 text-emerald-500" />} label="Tickets" value={`${activity.ticketPrice.usd} / ${activity.ticketPrice.inr}`} />
                       <div className="flex items-start space-x-2 text-sm text-slate-300">
                            <div className="flex-shrink-0 pt-0.5"><MapPinIcon className="w-4 h-4 text-rose-500" /></div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <span className="pl-1">{activity.distanceFromCityCenter}</span>
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold ml-2">
                                    (View on Map)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HotelCard: React.FC<{ hotel: Hotel, destinationName: string }> = ({ hotel, destinationName }) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, ${destinationName}`)}`;

    return (
        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md border border-gray-700 space-y-4">
            <div>
                <h4 className="font-bold text-xl text-slate-100">{hotel.name}</h4>
                <p className="text-slate-300 mt-1">{hotel.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-2 border-t border-gray-700">
               <DetailItem icon={<StarIcon className="w-4 h-4 text-amber-500" />} label="Rating" value={hotel.rating} />
               <DetailItem icon={<BuildingOfficeIcon className="w-4 h-4 text-emerald-500" />} label="Price" value={`${hotel.pricePerNight.usd} / ${hotel.pricePerNight.inr}`} />
               <div className="flex items-start space-x-2 text-sm text-slate-300">
                    <div className="flex-shrink-0 pt-0.5"><MapPinIcon className="w-4 h-4 text-rose-500" /></div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <span className="pl-1">{hotel.distanceFromCityCenter}</span>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-semibold ml-2">
                            (View on Map)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  if (!itinerary) return null;

  return (
    <div className="bg-transparent w-full mt-12 animate-fade-in">
        
        <div className="mb-12">
             <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-800 mb-6">
                <DynamicImage prompt={itinerary.destinationImagePrompt} altText={`A trip to ${itinerary.destinationName}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h2 className="absolute bottom-6 left-6 text-4xl font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    {`Your Trip to ${itinerary.destinationName}`}
                </h2>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
                <h3 className="font-semibold text-lg mb-2 text-slate-200">Best Time to Visit:</h3>
                <p className="text-slate-300">{itinerary.bestTimeToVisit}</p>
            </div>
        </div>
        
        <div className="space-y-12">
            {itinerary.dailyPlan.map((dayPlan) => (
                <div key={dayPlan.day}>
                    <div className="sticky top-20 bg-gray-900/90 py-3 backdrop-blur-sm z-10 mb-6 flex items-center space-x-4 border-b border-gray-700">
                        <span className="bg-brand text-white text-xl font-bold rounded-full h-10 w-10 flex items-center justify-center shadow">
                            {dayPlan.day}
                        </span>
                        <h3 className="text-3xl font-bold text-slate-100">Day Plan</h3>
                    </div>
                    <div className="relative">
                       {dayPlan.activities.map((activity, index) => <ActivityCard key={index} activity={activity} destinationName={itinerary.destinationName} />)}
                    </div>
                </div>
            ))}
        </div>

        <TravelTips destinationName={itinerary.destinationName} />

        {itinerary.hotelRecommendations?.length > 0 && (
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-slate-100 mb-8 border-b pb-4 border-gray-700">Hotel Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {itinerary.hotelRecommendations.map((hotel, index) => <HotelCard key={index} hotel={hotel} destinationName={itinerary.destinationName} />)}
                </div>
            </div>
        )}

        {itinerary.closingNote && (
            <div className="mt-16 pt-8 border-t border-dashed border-gray-700">
                <div className="bg-brand-light border-l-4 border-brand p-6 rounded-r-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-brand-dark mb-3">A Final Note From Your Planner</h3>
                    <p className="text-lg text-brand leading-relaxed italic">"{itinerary.closingNote.trim()}"</p>
                </div>
            </div>
        )}
    </div>
  );
};

export default ItineraryDisplay;