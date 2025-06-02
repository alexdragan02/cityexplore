import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Clock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cities } from '../data/mockData';
import BottomNavigation from '../components/BottomNavigation';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCitySelect = (cityId: string) => {
    navigate(`/city/${cityId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const firstName = user?.name?.split(' ')[0] ?? 'Traveler';

  return (
    <div className="page-container pb-16">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello, {firstName}</h1>
          <p className="text-gray-600">Where to next?</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <User className="h-full w-full p-2 text-gray-500" />
          )}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-6"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for a city..."
          className="input pl-10"
        />
      </motion.div>

      {/* Featured Cities */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 gap-4">
          {cities.slice(0, 4).map((city) => (
            <motion.div
              key={city.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCitySelect(city.id)}
              className="card overflow-hidden cursor-pointer"
            >
              <div className="h-32 -m-4 mb-2 relative">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-semibold">{city.name}</h3>
                  <div className="flex items-center text-white/80 text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{city.country}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <button className="btn-outline w-full mt-4 text-gray-600">
          View All Cities
        </button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={itemVariants}
            className="card flex flex-col items-center justify-center py-4 cursor-pointer"
            onClick={() => navigate('/planner')}
          >
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="font-medium">Plan a Trip</h3>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="card flex flex-col items-center justify-center py-4 cursor-pointer"
            onClick={() => navigate('/events')}
          >
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="font-medium">Find Events</h3>
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="card mb-4 p-4">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-3">
              <MapPin className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Paris Itinerary</h3>
              <p className="text-sm text-gray-600">3-day adventure created yesterday</p>
              <button 
                className="text-primary-600 text-sm font-medium mt-2"
                onClick={() => navigate('/itinerary/itinerary-1-3')}
              >
                View Itinerary
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <BottomNavigation />
    </div>
  );
};

export default HomePage;
