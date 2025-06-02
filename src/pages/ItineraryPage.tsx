import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, MapPin, Calendar, Coffee, UtensilsCrossed, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { generateItinerary } from '../data/mockData';
import { cities } from '../data/mockData';
import { Itinerary, ItineraryDay, Attraction } from '../types';
import BottomNavigation from '../components/BottomNavigation';

const ItineraryPage: React.FC = () => {
  const { itineraryId } = useParams<{ itineraryId: string }>();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (itineraryId) {
      // Parse the itinerary ID format "itinerary-{cityId}-{days}"
      const parts = itineraryId.split('-');
      if (parts.length >= 3) {
        const cityId = parts[1];
        const days = parseInt(parts[2]);
        
        // Generate the itinerary based on the parsed values
        const generatedItinerary = generateItinerary(cityId, days);
        setItinerary(generatedItinerary);
      }
      setLoading(false);
    }
  }, [itineraryId]);

  const toggleDayExpansion = (day: number) => {
    setExpandedDay(expandedDay === day ? -1 : day);
  };

  const getCityName = () => {
    if (itinerary?.cityId) {
      const city = cities.find(c => c.id === itinerary.cityId);
      return city?.name || 'Unknown City';
    }
    return 'Your Itinerary';
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="page-container">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Itinerary not found</h2>
          <button 
            className="btn-primary"
            onClick={() => navigate('/home')}
          >
            Go back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="p-2 -ml-2 mr-2 text-gray-600"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{getCityName()}: {itinerary.days.length}-Day Plan</h1>
        </div>
        <button className="p-2 text-gray-600">
          <Share2 size={20} />
        </button>
      </div>

      {/* Itinerary Overview */}
      <div className="bg-primary-50 rounded-xl p-4 mb-6">
        <div className="flex items-center mb-3">
          <Calendar className="text-primary-600 mr-2" size={20} />
          <h2 className="text-lg font-semibold text-primary-900">{itinerary.title}</h2>
        </div>
        <div className="flex justify-between text-sm text-primary-800">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{itinerary.days.length} days</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{getCityName()}</span>
          </div>
        </div>
      </div>

      {/* Day-by-day Itinerary */}
      <div className="space-y-4">
        {itinerary.days.map((day) => (
          <motion.div 
            key={day.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: day.day * 0.1 }}
            className="card"
          >
            {/* Day Header */}
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDayExpansion(day.day)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
                  {day.day}
                </div>
                <h3 className="font-semibold">Day {day.day}</h3>
              </div>
              <button className="text-gray-500">
                {expandedDay === day.day ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            
            {/* Day Content */}
            {expandedDay === day.day && (
              <div className="mt-4 space-y-4">
                {/* Morning */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">MORNING</h4>
                  
                  {/* Breakfast */}
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Coffee size={16} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h5 className="font-medium">Breakfast</h5>
                        <span className="text-xs text-gray-500 ml-2">8:00 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">{day.meals[0]?.name || 'Local café'}</p>
                    </div>
                  </div>
                  
                  {/* Morning Attraction */}
                  {day.attractions[0] && (
                    <AttractionItem attraction={day.attractions[0]} time="10:00 AM" />
                  )}
                </div>
                
                {/* Afternoon */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">AFTERNOON</h4>
                  
                  {/* Lunch */}
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <UtensilsCrossed size={16} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h5 className="font-medium">Lunch</h5>
                        <span className="text-xs text-gray-500 ml-2">1:00 PM</span>
                      </div>
                      <p className="text-sm text-gray-600">{day.meals[1]?.name || 'Local restaurant'}</p>
                    </div>
                  </div>
                  
                  {/* Afternoon Attraction */}
                  {day.attractions[1] && (
                    <AttractionItem attraction={day.attractions[1]} time="3:00 PM" />
                  )}
                </div>
                
                {/* Evening */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">EVENING</h4>
                  
                  {/* Evening Attraction */}
                  {day.attractions[2] && (
                    <AttractionItem attraction={day.attractions[2]} time="5:30 PM" />
                  )}
                  
                  {/* Dinner */}
                  <div className="flex items-start mt-4">
                    <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <UtensilsCrossed size={16} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h5 className="font-medium">Dinner</h5>
                        <span className="text-xs text-gray-500 ml-2">8:00 PM</span>
                      </div>
                      <p className="text-sm text-gray-600">{day.meals[2]?.name || 'Local restaurant'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Day Stats */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-500">
                  <div>Walking distance: ~{day.totalDistance} km</div>
                  <button className="text-primary-600 font-medium">Edit Day</button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button className="btn-outline">
          Edit Itinerary
        </button>
        <button className="btn-primary">
          Save Itinerary
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

interface AttractionItemProps {
  attraction: Attraction;
  time: string;
}

const AttractionItem: React.FC<AttractionItemProps> = ({ attraction, time }) => (
  <div className="flex mb-4">
    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 mr-3">
      <img 
        src={attraction.image} 
        alt={attraction.name} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center">
        <h5 className="font-medium">{attraction.name}</h5>
        <span className="text-xs text-gray-500 ml-2">{time}</span>
      </div>
      <div className="flex items-center text-xs text-gray-500 mb-1">
        <Clock size={12} className="mr-1" />
        <span>{attraction.duration} min</span>
      </div>
      <p className="text-xs text-gray-600 line-clamp-2">{attraction.description}</p>
    </div>
  </div>
);

export default ItineraryPage;