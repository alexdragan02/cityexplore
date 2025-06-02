export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  interests: string[];
  transportationMode: 'walking' | 'public' | 'car';
  budgetLevel: 'budget' | 'moderate' | 'luxury';
  activityPace: 'relaxed' | 'moderate' | 'active';
}

export interface City {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
}

export interface Attraction {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  rating: number;
  duration: number; // in minutes
  price: number; // 0 = free
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
}

export interface ItineraryDay {
  day: number;
  attractions: Attraction[];
  meals: Meal[];
  totalDistance: number; // in km
}

export interface Itinerary {
  id: string;
  cityId: string;
  userId: string;
  title: string;
  days: ItineraryDay[];
  createdAt: string;
  updatedAt: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  cuisine: string;
  price: number; // 1-5 scale
  image: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
}

export interface Event {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  price: number;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
}