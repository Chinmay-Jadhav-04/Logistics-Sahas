import React from 'react';
import { MapPin, Navigation, Clock, AlertCircle } from 'lucide-react';

const TripInformation = ({ tripData }) => {
  // Default trip data if none provided
  const defaultTrip = {
    currentLocation: {
      address: "123 Main Street, Downtown",
      city: "New York, NY 10001"
    },
    dropoffLocation: {
      address: "456 Park Avenue, Midtown",
      city: "New York, NY 10022"
    },
    estimatedTime: "25 minutes",
    distance: "8.5 miles",
    status: "On Route"
  };

  const trip = tripData || defaultTrip;

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Route': return 'text-blue-600 bg-blue-100';
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Trip Information</h3>
      
      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
          {trip.status}
        </span>
      </div>

      {/* Location Information */}
      <div className="space-y-6">
        {/* Current Location */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <MapPin className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Current Location</span>
            </div>
            <p className="text-gray-800 font-medium">{trip.currentLocation.address}</p>
            <p className="text-sm text-gray-600">{trip.currentLocation.city}</p>
          </div>
        </div>

        {/* Route Line */}
        <div className="flex items-center ml-1">
          <div className="w-1 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Drop-off Location */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <Navigation className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Drop-off Location</span>
            </div>
            <p className="text-gray-800 font-medium">{trip.dropoffLocation.address}</p>
            <p className="text-sm text-gray-600">{trip.dropoffLocation.city}</p>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">ETA</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{trip.estimatedTime}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Navigation className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Distance</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{trip.distance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInformation;