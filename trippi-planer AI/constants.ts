import type { TripPreferences } from './types';
import { 
    UserIcon, 
    UsersIcon, 
    HeartIcon, 
    HomeIcon, 
    WalletIcon, 
    TagIcon, 
    SparklesIcon, 
    DiamondIcon 
} from './components/icons';

export const BUDGET_OPTIONS = [
    { value: 'economy', label: 'Economy', range: '₹2,000 - ₹5,000', icon: WalletIcon },
    { value: 'standard', label: 'Standard', range: '₹5,001 - ₹10,000', icon: TagIcon },
    { value: 'premium', label: 'Premium', range: '₹10,001 - ₹20,000', icon: SparklesIcon },
    { value: 'luxury', label: 'Luxury', range: '₹20,001+', icon: DiamondIcon },
] as const;

export const TRAVEL_WITH_OPTIONS = [
    { value: 'solo', label: 'Just Me', icon: UserIcon },
    { value: 'friends', label: 'Friends', icon: UsersIcon },
    { value: 'couple', label: 'Couple', icon: HeartIcon },
    { value: 'family', label: 'Family', icon: HomeIcon },
] as const;

export const ADVENTURE_TYPE_OPTIONS = [
    "Trekking & Nature Walks",
    "Road Trip & Bike Rides",
    "Sightseeing Tours",
    "Temple & Culture Visits",
    "Wellness & Peace Retreats",
    "Food Trails & Cooking Fun",
    "Art, History & Museums",
    "Local Life & Crafts",
    "Amusement Park",
    "Other"
];

export const POPULAR_DESTINATIONS = [
    "Paris, France",
    "Rome, Italy",
    "Tokyo, Japan",
    "Bali, Indonesia",
    "New York City, USA",
    "London, UK",
    "Dubai, UAE",
    "Sydney, Australia",
    "Kyoto, Japan",
    "Prague, Czech Republic",
    "Manali, HP, India",
    "Goa, India",
    "Santorini, Greece"
];