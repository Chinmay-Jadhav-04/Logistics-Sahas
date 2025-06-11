'use client';
import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/button';
import DriverDetails from './components/DriverDetails';
import TripInformation from './components/TripInformation';
import { useRouter } from 'next/navigation';
import { useMobile } from '@/hooks/useMobile';

const DriverDetailsPage = () => {
  const router = useRouter();
  const isMobile = useMobile();
  const [isTracking, setIsTracking] = useState(false);

  // Sample driver and trip data (this would normally come from props or API)
  const driverData = {
    name: "Michael Rodriguez",
    title: "Professional Driver",
    rating: 4.9,
    totalTrips: 127,
    phone: "+1 (555) 123-4567",
    vehicle: "Toyota Camry",
    vehicleNumber: "ABC 1234",
    licenseNumber: "DL12345679",
    licenseExpiry: "Dec 2027",
    insuranceStatus: "Active",
    experience: "5 Years",
    experienceSince: "Since 2020"
  };

  const tripData = {
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

  const handleBack = () => {
    router.back();
  };

  const handleTrackJourney = () => {
    setIsTracking(true);
    // Here you would implement the tracking functionality
    console.log('Starting journey tracking...');
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'px-4' : 'px-8'} py-6`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Driver Details</h1>
      </div>

      {/* Main Content */}
      <div className={`max-w-6xl mx-auto ${isMobile ? 'space-y-6' : 'grid grid-cols-1 lg:grid-cols-3 gap-8'}`}>
        {/* Driver Details Section */}
        <div className={`${isMobile ? '' : 'lg:col-span-2'}`}>
          <DriverDetails driverData={driverData} />
        </div>

        {/* Trip Information Section */}
        <div className={`${isMobile ? '' : 'lg:col-span-1'}`}>
          <TripInformation tripData={tripData} />
        </div>
      </div>

      {/* Track Details Section */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Track Details</h3>
            <p className="text-gray-600 mb-6">Confirm all details are correct before tracking your journey</p>
            
            <Button
              onClick={handleTrackJourney}
              disabled={isTracking}
              className={`inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors ${
                isTracking ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <Play className="w-5 h-5 mr-2" />
              {isTracking ? 'Tracking Started...' : 'Track Journey'}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Space */}
      {isMobile && <div className="h-20"></div>}
    </div>
  );
};

export default DriverDetailsPage;