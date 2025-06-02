import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Calendar, Compass, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Map, label: 'Explore', path: '/explore' },
    { icon: Calendar, label: 'Planner', path: '/planner' },
    { icon: Compass, label: 'Events', path: '/events' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex justify-between px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              className={`flex flex-col items-center py-2 px-3 ${
                active ? 'text-primary-600' : 'text-gray-500'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={24} className={active ? 'animate-pulse' : ''} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;