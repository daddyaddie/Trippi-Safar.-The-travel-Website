export interface TripPreferences {
  location: string;
  days: string;
  budget: 'economy' | 'standard' | 'premium' | 'luxury';
  travelWith: 'solo' | 'couple' | 'family' | 'friends';
  adventureTypes: string[];
}

export interface Price {
  usd: string;
  inr: string;
}

export interface GeoLocation {
    latitude: number;
    longitude: number;
}

export interface Activity {
  name: string;
  description: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  rating: string;
  openingHours: string;
  ticketPrice: Price;
  distanceFromCityCenter: string;
  geoLocation: GeoLocation;
}

export interface DayPlan {
    day: number;
    activities: Activity[];
}

export interface Hotel {
    name: string;
    description: string;
    rating: string;
    pricePerNight: Price;
    distanceFromCityCenter: string;
    geoLocation: GeoLocation;
}

export interface ItineraryPlan {
    destinationName: string;
    destinationGeoLocation: GeoLocation;
    destinationImagePrompt: string;
    bestTimeToVisit: string;
    dailyPlan: DayPlan[];
    hotelRecommendations: Hotel[];
    closingNote: string;
}
