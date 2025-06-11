import React from 'react';
import { Star, Phone, Calendar, Shield, Car, Clock } from 'lucide-react';

const DriverDetails = ({ driverData }) => {
  // Default data if no driver data is provided
  const defaultDriver = {
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

  const driver = driverData || defaultDriver;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Driver Profile Section */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{driver.name}</h2>
          <p className="text-gray-600 mb-2">{driver.title}</p>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(driver.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {driver.rating} ({driver.totalTrips} trips)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Vehicle Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Car className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Vehicle</span>
            </div>
            <p className="text-gray-800 font-medium">{driver.vehicle}</p>
            <p className="text-sm text-gray-600">{driver.vehicleNumber}</p>
          </div>

          {/* Phone Number */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Phone className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Phone Number</span>
            </div>
            <p className="text-gray-800 font-medium">{driver.phone}</p>
          </div>

          {/* License Number */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">License Number</span>
            </div>
            <p className="text-gray-800 font-medium">{driver.licenseNumber}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Experience */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Experience</span>
            </div>
            <p className="text-gray-800 font-medium">{driver.experience}</p>
            <p className="text-sm text-gray-600">{driver.experienceSince}</p>
          </div>

          {/* License Expiry */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">License Expiry</span>
            </div>
            <p className="text-gray-800 font-medium">{driver.licenseExpiry}</p>
          </div>

          {/* Insurance Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Insurance Status</span>
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              driver.insuranceStatus === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {driver.insuranceStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;