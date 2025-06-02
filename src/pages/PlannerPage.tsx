import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Calendar, ChevronRight } from 'lucide-react';
import { cities } from '../data/mockData';
import { generateItinerary } from '../data/mockData';
import BottomNavigation from '../components/BottomNavigation';

const PlannerPage: React.FC = () => {
  const { cityId, days: daysParam } = useParams<{ cityId?: string; days?: string }>();
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number>(daysParam ? parseInt(daysParam) : 3);
  const [selectedCity, setSelectedCity] = useState<string>(cityId || '');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // If we have both city and days from URL params, generate itinerary immediately
  useEffect(() => {
    if (cityId && daysParam) {
      handleGenerateItinerary();
    }
  }, [cityId, daysParam]);

  const handleDayChange = (days: number) => {
    setSelectedDays(days);
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
  };

  const handleGenerateItinerary = () => {
    if (!selectedCity) {
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      const itineraryId = `itinerary-${selectedCity}-${selectedDays}`;
      navigate(`/itinerary/${itineraryId}`);
    }, 1500);
  };

  return (
    <div className="page-container pb-16">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          className="p-2 -ml-2 mr-2 text-gray-600"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Plan Your Trip</h1>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
            1
          </div>
          <div className="h-1 w-12 bg-primary-600"></div>
          <div className={`w-8 h-8 rounded-full ${selectedCity ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center`}>
            2
          </div>
          <div className={`h-1 w-12 ${selectedCity ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full ${selectedCity && selectedDays ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center`}>
            3
          </div>
        </div>
      </div>

      {/* Step 1: Select City */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="mr-2 text-primary-600" />
          Select a City
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {cities.map(city => (
            <div
              key={city.id}
              onClick={() => handleCitySelect(city.id)}
              className={`card overflow-hidden cursor-pointer transition-all ${selectedCity === city.id ? 'ring-2 ring-primary-500' : ''}`}
            >
              <div className="h-24 -m-4 mb-2 relative">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-semibold">{city.name}</h3>
                  <div className="flex items-center text-white/80 text-xs">
                    <span>{city.country}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Step 2: Select Duration */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-primary-600" />
          How many days?
        </h2>
        
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 7].map(days => (
            <button
              key={days}
              onClick={() => handleDayChange(days)}
              className={`btn ${selectedDays === days ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {days} {days === 1 ? 'Day' : 'Days'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        <button
          onClick={handleGenerateItinerary}
          disabled={!selectedCity || isGenerating}
          className={`btn w-full py-3 flex items-center justify-center space-x-2 ${
            !selectedCity ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'btn-primary'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              <span>Generating your perfect itinerary...</span>
            </>
          ) : (
            <>
              <span>Create Itinerary</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-500 text-center mt-4">
          We'll create a personalized plan based on your preferences
        </p>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default PlannerPage;