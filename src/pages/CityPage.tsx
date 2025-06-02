import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { cities, attractions } from '../data/mockData';
import BottomNavigation from '../components/BottomNavigation';

const CityPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  
  const city = cities.find(c => c.id === cityId);
  const cityAttractions = attractions[cityId || ''] || [];

  if (!city) {
    return (
      <div className="page-container">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">City not found</h2>
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
    <div className="flex flex-col min-h-screen pb-16">
      {/* Hero Image */}
      <div className="relative h-64">
        <img 
          src={city.image} 
          alt={city.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        
        {/* Back Button */}
        <button 
          className="absolute top-4 left-4 bg-black/30 text-white p-2 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* City Info */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-3xl font-bold">{city.name}</h1>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{city.country}</span>
          </div>
        </div>
      </div>
      
      {/* Plan Trip Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white -mt-6 rounded-t-3xl p-6 flex-1"
      >
        <div className="bg-primary-50 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold text-primary-900 mb-2">Plan Your Trip</h2>
          <p className="text-primary-700 text-sm mb-4">
            How many days will you stay in {city.name}?
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[2, 3, 5].map(days => (
              <button
                key={days}
                className="btn bg-white border border-primary-200 text-primary-700 hover:bg-primary-100"
                onClick={() => navigate(`/planner/${cityId}/${days}`)}
              >
                {days} Days
              </button>
            ))}
          </div>
          <button 
            className="btn-primary w-full flex items-center justify-center space-x-2"
            onClick={() => navigate(`/planner/${cityId}`)}
          >
            <Calendar size={18} />
            <span>Custom Plan</span>
          </button>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">About {city.name}</h2>
          <p className="text-gray-600">{city.description}</p>
        </div>
        
        {/* Top Attractions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Attractions</h2>
          <div className="space-y-4">
            {cityAttractions.slice(0, 3).map(attraction => (
              <motion.div 
                key={attraction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={{ scale: 0.98 }}
                className="card flex p-0 overflow-hidden"
              >
                <div className="w-24 h-24">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex-1">
                  <h3 className="font-medium text-gray-800">{attraction.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Clock size={12} className="mr-1" />
                    <span>{attraction.duration} min</span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">{attraction.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button 
            className="btn-outline w-full mt-4 text-gray-600"
            onClick={() => navigate(`/attractions/${cityId}`)}
          >
            View All Attractions
          </button>
        </div>
        
        {/* Local Events */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Local Events</h2>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Check local events and activities</p>
            <button 
              className="btn-secondary mt-2"
              onClick={() => navigate(`/events/${cityId}`)}
            >
              Browse Events
            </button>
          </div>
        </div>
      </motion.div>
      
      <BottomNavigation />
    </div>
  );
};

export default CityPage;