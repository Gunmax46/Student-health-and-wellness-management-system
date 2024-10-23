import React from 'react';
import ProgramCard from '../components/ProgramCard';
import { Program } from '../types';

const Programs = () => {
  // Mock data for programs
  const programs: Program[] = [
    {
      id: '1',
      title: 'Mindfulness Meditation Workshop',
      description: 'A weekly workshop teaching mindfulness techniques to reduce stress and anxiety.',
      category: 'mental-health',
      startDate: new Date('2024-03-20'),
      endDate: new Date('2024-04-20'),
      capacity: 20,
      enrolled: 15,
      thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: '2',
      title: 'HIIT Fitness Program',
      description: 'A 4-week high-intensity fitness program with workout plans that can be done from home.',
      category: 'fitness',
      startDate: new Date('2024-03-25'),
      endDate: new Date('2024-04-22'),
      capacity: 30,
      enrolled: 25,
      thumbnail: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: '3',
      title: 'Healthy Meal Prep 101',
      description: 'A program teaching students how to prepare quick, nutritious meals on a budget.',
      category: 'nutrition',
      startDate: new Date('2024-03-22'),
      endDate: new Date('2024-04-12'),
      capacity: 25,
      enrolled: 20,
      thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    },
    // Add more programs as needed
  ];

  const categories = ['All', 'mental-health', 'fitness', 'nutrition'] as const;
  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[number]>('All');

  const filteredPrograms = programs.filter(program => 
    selectedCategory === 'All' ? true : program.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Wellness Programs
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Join our comprehensive wellness programs designed to support your physical, mental, and nutritional well-being.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex justify-center space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;