import React from 'react';
import { Calendar, Users } from 'lucide-react';
import type { Program } from '../types';

const ProgramCard = ({ program }: { program: Program }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {program.thumbnail && (
        <img
          src={program.thumbnail}
          alt={program.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {program.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{program.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(program.startDate)} - {formatDate(program.endDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{program.enrolled}/{program.capacity} enrolled</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 capitalize">
            {program.category.replace('-', ' ')}
          </span>
          <button 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600"
            disabled={program.enrolled >= program.capacity}
          >
            {program.enrolled >= program.capacity ? 'Full' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;