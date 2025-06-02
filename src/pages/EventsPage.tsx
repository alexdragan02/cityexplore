import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, MapPin, Search, Music, Utensils, Palette, Users } from 'lucide-react';
import { events } from '../data/mockData';
import BottomNavigation from '../components/BottomNavigation';

const EventsPage: React.FC = () => {
  const { cityId } = useParams<{ cityId?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get events for the selected city, or all events if no city is selected
  const cityEvents = cityId 
    ? events[cityId] || []
    : Object.values(events).flat();

  // Filter events by category if a category is selected
  const filteredEvents = selectedCategory === 'all' 
    ? cityEvents 
    : cityEvents.filter(event => event.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All', icon: <Calendar size={16} /> },
    { id: 'music', name: 'Music', icon: <Music size={16} /> },
    { id: 'food', name: 'Food', icon: <Utensils size={16} /> },
    { id: 'art', name: 'Art', icon: <Palette size={16} /> },
    { id: 'social', name: 'Social', icon: <Users size={16} /> }
  ];

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
        <h1 className="text-2xl font-bold">Local Events</h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search events..."
          className="input pl-10"
        />
      </div>

      {/* Categories */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full flex items-center space-x-1 whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-0 overflow-hidden"
            >
              <div className="h-40 relative">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {event.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{event.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{event.location.address.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>{event.duration} min</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="font-medium">
                    {event.price > 0 ? `€${event.price}` : 'Free'}
                  </div>
                  <button className="btn-primary py-1.5">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No events found</h3>
            <p className="text-gray-500">Try changing your search criteria</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EventsPage;