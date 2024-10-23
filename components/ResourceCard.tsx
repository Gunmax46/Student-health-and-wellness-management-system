import React, { useState } from 'react';
import { Play, FileText, Link as LinkIcon, X } from 'lucide-react';
import type { Resource } from '../types';

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const [showVideo, setShowVideo] = useState(false);

  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return <Play className="h-5 w-5" />;
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  const handleVideoClick = () => {
    if (resource.type === 'video') {
      setShowVideo(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {showVideo ? (
        <div className="relative pt-[56.25%]">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-2 right-2 z-10 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
          >
            <X className="h-5 w-5" />
          </button>
          <iframe
            src={resource.content}
            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        resource.thumbnail && (
          <div
            className={`relative w-full h-48 cursor-pointer ${
              resource.type === 'video' ? 'group' : ''
            }`}
            onClick={handleVideoClick}
          >
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {resource.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity">
                <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        )
      )}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {getIcon()}
          <span className="text-sm font-medium text-gray-500 capitalize">
            {resource.type}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {resource.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 capitalize">
            {resource.category.replace('-', ' ')}
          </span>
          {resource.type !== 'video' && (
            <a
              href={resource.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 text-sm font-medium"
            >
              Learn More →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;