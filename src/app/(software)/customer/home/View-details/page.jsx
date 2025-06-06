'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import Photos from './components/Photos';
import Description from './components/Description';
import Location from './components/Location';
import { ServiceProviders } from '@/constants/services';

const ViewDetailsPage = () => {
  const params = useParams();
  const cfsId = params?.id;

  // Find the specific CFS provider based on the ID
  const cfsProvider = ServiceProviders.find(provider => provider.id === cfsId);

  // If CFS provider not found, show error message
  if (!cfsProvider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CFS Not Found</h1>
          <p className="text-gray-600">The requested CFS facility could not be found.</p>
        </div>
      </div>
    );
  }

  // Extract image URLs from the provider data
  const imageUrls = cfsProvider.images?.map(img => img.src) || [];

  // Mock facilities data - you can extend this based on your needs
  const facilities = [
    'Container Storage',
    'Customs Clearance',
    'Cargo Handling',
    'Documentation',
    'Security Services',
    '24/7 Operations'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {cfsProvider.title}
                </h1>
                <p className="text-gray-600 mb-3">{cfsProvider.location}</p>
                
                {/* Rating and Tags */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-lg font-semibold text-gray-900">
                        {cfsProvider.rating}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">rating</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cfsProvider.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photos Section */}
            <Photos 
              images={imageUrls} 
              title={cfsProvider.title}
            />

            {/* Description Section */}
            <Description
              description={cfsProvider.description}
              facilities={facilities}
              isEditable={false}
              userRole="user"
            />
          </div>

          {/* Right Column - Location */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Location
                location={cfsProvider.location}
                address={cfsProvider.location}
                coordinates={{
                  lat: 19.0760,
                  lng: 72.8777
                }}
                isEditable={false}
                userRole="user"
              />
            </div>
          </div>
        </div>

        {/* Services Section (Optional) */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {facilities.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-sm font-medium text-gray-800">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPage;