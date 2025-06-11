import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Phone, MapPin, Calendar, Shield, User } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DriverDetailsPage({ driverId, driverData: passedDriverData, onBack, onTrackJourney }) {
  const [driverData, setDriverData] = useState(null);

  // Use passed data or fetch/generate sample data
  useEffect(() => {
    if (passedDriverData) {
      // Transform transportation service data to driver data format
      const transformedDriver = {
        id: passedDriverData.id || 'MR001',
        name: passedDriverData.driverName || 'Michael Rodriguez',
        title: 'Professional Driver',
        rating: 4.9,
        totalTrips: 127,
        profileImage: null,
        vehicle: {
          type: 'Toyota Camry',
          number: passedDriverData.vehicleNo || 'ABC-1234'
        },
        experience: {
          years: 5,
          since: '2020'
        },
        contact: {
          phone: passedDriverData.phoneNumber || '+1 (555) 123-4567'
        },
        license: {
          number: 'DL123456789',
          expiry: 'Dec 2027'
        },
        insurance: {
          status: 'Active'
        },
        currentTrip: {
          pickup: '123 Main Street, Downtown',
          pickupCity: 'New York, NY 10001',
          dropoff: '456 Park Avenue, Midtown',
          dropoffCity: 'New York, NY 10022'
        },
        // Store original service data for tracking
        serviceData: passedDriverData
      };
      setDriverData(transformedDriver);
    } else {
      // Fallback sample data
      const sampleDriver = {
        id: driverId || 'MR001',
        name: 'Michael Rodriguez',
        title: 'Professional Driver',
        rating: 4.9,
        totalTrips: 127,
        profileImage: null,
        vehicle: {
          type: 'Toyota Camry',
          number: 'ABC-1234'
        },
        experience: {
          years: 5,
          since: '2020'
        },
        contact: {
          phone: '+1 (555) 123-4567'
        },
        license: {
          number: 'DL123456789',
          expiry: 'Dec 2027'
        },
        insurance: {
          status: 'Active'
        },
        currentTrip: {
          pickup: '123 Main Street, Downtown',
          pickupCity: 'New York, NY 10001',
          dropoff: '456 Park Avenue, Midtown',
          dropoffCity: 'New York, NY 10022'
        }
      };
      setDriverData(sampleDriver);
    }
  }, [driverId, passedDriverData]);

  const handleTrackJourney = () => {
    if (onTrackJourney) {
      onTrackJourney(driverData);
    }
  };

  if (!driverData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading driver details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80dvh] bg-accent rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-primary text-white rounded-t-lg">
        <button 
          onClick={onBack}
          className="mr-4 hover:bg-white/10 p-2 rounded"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Driver Details</h1>
      </div>

      <div className="p-6">
        {/* Driver Profile Section */}
        <div className="bg-accent border rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              {driverData.profileImage ? (
                <img 
                  src={driverData.profileImage} 
                  alt={driverData.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User size={32} className="text-gray-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-primary">{driverData.name}</h2>
              <p className="text-light-primary mb-2">{driverData.title}</p>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={`${star <= Math.floor(driverData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {driverData.rating} ({driverData.totalTrips} trips)
                </span>
              </div>
            </div>
          </div>

          {/* Driver Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <MapPin size={16} />
                  <span className="font-medium">Vehicle</span>
                </div>
                <div className="ml-6">
                  <p className="text-light-primary">{driverData.vehicle.type}</p>
                  <p className="text-sm text-light-primary">{driverData.vehicle.number}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Phone size={16} />
                  <span className="font-medium">Phone Number</span>
                </div>
                <p className="ml-6 text-light-primary">{driverData.contact.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Calendar size={16} />
                  <span className="font-medium">Experience</span>
                </div>
                <div className="ml-6">
                  <p className="text-light-primary">{driverData.experience.years} Years</p>
                  <p className="text-sm text-light-primary">Since {driverData.experience.since}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Shield size={16} />
                  <span className="font-medium">License Number</span>
                </div>
                <p className="ml-6 text-light-primary">{driverData.license.number}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Calendar size={16} />
                  <span className="font-medium">License Expiry</span>
                </div>
                <p className="ml-6 text-light-primary">{driverData.license.expiry}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Shield size={16} />
                  <span className="font-medium">Insurance Status</span>
                </div>
                <div className="ml-6">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background text-green-800">
                    {driverData.insurance.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Information */}
        <div className="bg-background rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Trip Information</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Current Location</span>
              </div>
              <div className="ml-5">
                <p className="text-light-primary">{driverData.currentTrip.pickup}</p>
                <p className="text-sm text-light-primary">{driverData.currentTrip.pickupCity}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium">Drop-off Location</span>
              </div>
              <div className="ml-5">
                <p className="text-light-primary">{driverData.currentTrip.dropoff}</p>
                <p className="text-sm text-light-primary">{driverData.currentTrip.dropoffCity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Track Details Section */}
        <div className="bg-accent rounded-lg p-6">
          <div className="text-center">
            <p className="text-primary mb-4">Confirm all details are correct before Tracking your journey</p>
            <div className="flex flex-row justify-center">
            <Button
              onClick={handleTrackJourney}
              title="▶ Track Journey"
              className="bg-primary hover:bg-light-primary  text-white px-8 py-3 rounded-lg font-medium"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}