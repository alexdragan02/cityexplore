import { City, Attraction, Itinerary, Event, Meal } from '../types';

export const cities: City[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
    description: 'The City of Light is known for its stunning architecture, art museums, historical landmarks, and romantic atmosphere.'
  },
  {
    id: '2',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg',
    description: 'A vibrant city known for its art and architecture, with the sagrada familia and other modernist landmarks designed by Antoni Gaudí.'
  },
  {
    id: '3',
    name: 'Amsterdam',
    country: 'Netherlands',
    image: 'https://images.pexels.com/photos/1414467/pexels-photo-1414467.jpeg',
    description: 'Known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city\'s 17th-century Golden Age.'
  },
  {
    id: '4',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg',
    description: 'Italy\'s capital city is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display.'
  },
  {
    id: '5',
    name: 'Berlin',
    country: 'Germany',
    image: 'https://images.pexels.com/photos/1128415/pexels-photo-1128415.jpeg',
    description: 'Germany\'s capital dates to the 13th century. Reminders of the city\'s turbulent 20th-century history include the Holocaust memorial and the Berlin Wall\'s graffitied remains.'
  }
];

export const attractions: Record<string, Attraction[]> = {
  '1': [
    {
      id: 'p1',
      name: 'Eiffel Tower',
      type: 'landmark',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
      description: 'Iconic symbol of Paris with panoramic city views.',
      rating: 4.5,
      duration: 120,
      price: 25,
      location: {
        address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
        coordinates: {
          lat: 48.8584,
          lng: 2.2945
        }
      }
    },
    {
      id: 'p2',
      name: 'Louvre Museum',
      type: 'museum',
      image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg',
      description: 'World\'s largest art museum and historic monument in Paris.',
      rating: 4.8,
      duration: 180,
      price: 17,
      location: {
        address: 'Rue de Rivoli, 75001 Paris',
        coordinates: {
          lat: 48.8606,
          lng: 2.3376
        }
      }
    },
    {
      id: 'p3',
      name: 'Notre-Dame Cathedral',
      type: 'landmark',
      image: 'https://images.pexels.com/photos/5273002/pexels-photo-5273002.jpeg',
      description: 'Medieval Catholic cathedral on the Île de la Cité.',
      rating: 4.7,
      duration: 60,
      price: 0,
      location: {
        address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
        coordinates: {
          lat: 48.8530,
          lng: 2.3499
        }
      }
    },
    {
      id: 'p4',
      name: 'Montmartre',
      type: 'neighborhood',
      image: 'https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg',
      description: 'A hill in Paris\'s 18th arrondissement known for its artistic history and the Sacré-Cœur Basilica.',
      rating: 4.6,
      duration: 180,
      price: 0,
      location: {
        address: 'Montmartre, 75018 Paris',
        coordinates: {
          lat: 48.8867,
          lng: 2.3431
        }
      }
    },
    {
      id: 'p5',
      name: 'Seine River Cruise',
      type: 'activity',
      image: 'https://images.pexels.com/photos/951539/pexels-photo-951539.jpeg',
      description: 'Sightseeing cruise along the Seine River.',
      rating: 4.5,
      duration: 60,
      price: 15,
      location: {
        address: 'Port de la Conférence, Pont de l\'Alma, 75008 Paris',
        coordinates: {
          lat: 48.8615,
          lng: 2.3050
        }
      }
    }
  ]
};

export const meals: Record<string, Meal[]> = {
  '1': [
    {
      id: 'm1',
      name: 'Café de Flore',
      type: 'breakfast',
      cuisine: 'French',
      price: 4,
      image: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg',
      location: {
        address: '172 Boulevard Saint-Germain, 75006 Paris',
        coordinates: {
          lat: 48.8539,
          lng: 2.3336
        }
      }
    },
    {
      id: 'm2',
      name: 'Le Comptoir du Relais',
      type: 'lunch',
      cuisine: 'French',
      price: 3,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      location: {
        address: '9 Carrefour de l\'Odéon, 75006 Paris',
        coordinates: {
          lat: 48.8516,
          lng: 2.3387
        }
      }
    },
    {
      id: 'm3',
      name: 'Le Jules Verne',
      type: 'dinner',
      cuisine: 'French',
      price: 5,
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
      location: {
        address: 'Eiffel Tower, Avenue Gustave Eiffel, 75007 Paris',
        coordinates: {
          lat: 48.8583,
          lng: 2.2944
        }
      }
    }
  ]
};

export const events: Record<string, Event[]> = {
  '1': [
    {
      id: 'e1',
      name: 'Paris Food Festival',
      category: 'food',
      image: 'https://images.pexels.com/photos/5638331/pexels-photo-5638331.jpeg',
      description: 'Annual food festival showcasing the best of Parisian cuisine.',
      date: '2025-06-15',
      time: '11:00',
      duration: 480,
      price: 10,
      location: {
        address: 'Champ de Mars, 75007 Paris',
        coordinates: {
          lat: 48.8556,
          lng: 2.2986
        }
      }
    },
    {
      id: 'e2',
      name: 'Jazz Concert at La Caveau',
      category: 'music',
      image: 'https://images.pexels.com/photos/4940906/pexels-photo-4940906.jpeg',
      description: 'Live jazz performance in one of Paris\'s oldest jazz clubs.',
      date: '2025-06-16',
      time: '20:30',
      duration: 120,
      price: 25,
      location: {
        address: '21 Rue de la Huchette, 75005 Paris',
        coordinates: {
          lat: 48.8529,
          lng: 2.3456
        }
      }
    },
    {
      id: 'e3',
      name: 'Photography Workshop',
      category: 'art',
      image: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg',
      description: 'Learn photography techniques while exploring Parisian streets.',
      date: '2025-06-17',
      time: '14:00',
      duration: 180,
      price: 40,
      location: {
        address: '1 Place du Trocadéro et du 11 Novembre, 75016 Paris',
        coordinates: {
          lat: 48.8616,
          lng: 2.2893
        }
      }
    }
  ]
};

export const generateItinerary = (cityId: string, days: number): Itinerary => {
  const cityAttractions = attractions[cityId] || [];
  const cityMeals = meals[cityId] || [];
  
  const itineraryDays = Array.from({ length: days }, (_, i) => {
    // Shuffle attractions to get random ones for each day
    const shuffledAttractions = [...cityAttractions].sort(() => Math.random() - 0.5);
    // Take 2-4 attractions per day
    const dayAttractions = shuffledAttractions.slice(0, Math.floor(Math.random() * 3) + 2);
    
    return {
      day: i + 1,
      attractions: dayAttractions,
      meals: cityMeals,
      totalDistance: Math.floor(Math.random() * 10) + 2 // Random distance between 2-12 km
    };
  });
  
  return {
    id: `itinerary-${cityId}-${days}`,
    cityId,
    userId: 'user1',
    title: `${days}-Day Adventure`,
    days: itineraryDays,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};