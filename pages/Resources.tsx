import React, { useState, useEffect } from 'react';
import ResourceCard from '../components/ResourceCard';
import { Resource } from '../types';
import { Brain, Heart, Salad, Phone, BookOpen, Youtube } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Initial fetch of resources
    fetchResources();

    // Setup WebSocket connection
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    // Listen to resource events
    newSocket.on('new_resource', (resource: Resource) => {
      setResources((prev) => [resource, ...prev]);
    });

    newSocket.on('update_resource', (updatedResource: Resource) => {
      setResources((prev) =>
        prev.map((resource) =>
          resource.id === updatedResource.id ? updatedResource : resource
        )
      );
    });

    // Cleanup the socket on component unmount
    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'All', icon: BookOpen },
    { name: 'mental-health', icon: Brain },
    { name: 'fitness', icon: Heart },
    { name: 'nutrition', icon: Salad },
    { name: 'video', icon: Youtube },
  ] as const;

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'video'
        ? resource.type === 'video'
        : resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Wellness Resources
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Access our comprehensive collection of health and wellness resources.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex justify-center space-x-4">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`px-4 py-2 rounded-full text-sm font-medium inline-flex items-center space-x-2 ${
                selectedCategory === name
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>
                {name
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span>
            </button>
          ))}
        </div>

        {/* Emergency Support Banner */}
        <div className="mt-8 bg-rose-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-rose-500" />
              <div>
                <h3 className="text-sm font-medium text-rose-800">
                  Need immediate support?
                </h3>
                <p className="text-sm text-rose-600">
                  Our counselors are available 24/7. Call us at 1-800-WELLNESS
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600">
              Get Help Now
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
