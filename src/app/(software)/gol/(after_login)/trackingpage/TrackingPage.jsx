import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Phone, Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TrackingPage({ orderData, onBack }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample tracking data - replace with actual API call
  const trackingData = {
    orderId: orderData?.orderId || 'TRX001',
    vehicle: orderData?.vehicleNo || 'MH12AB1234',
    driverName: orderData?.driverName || 'Rajiv',
    phone: orderData?.phoneNumber || '+91-9876543210',
    route: orderData?.route || 'Pune → Nashik',
    status: orderData?.status || 'On Route',
    currentLocation: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Mumbai, Maharashtra'
    },
    destination: {
      lat: 19.9975,
      lng: 73.7898,
      address: 'Nashik, Maharashtra'
    }
  };

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = () => {
      // Add Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Add Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (typeof L !== 'undefined') {
        // Initialize the map
        const map = L.map('tracking-map').setView([trackingData.currentLocation.lat, trackingData.currentLocation.lng], 10);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add current location marker (blue)
        const currentMarker = L.marker([trackingData.currentLocation.lat, trackingData.currentLocation.lng])
          .addTo(map)
          .bindPopup(`<b>Current Location</b><br>${trackingData.currentLocation.address}`)
          .openPopup();

        // Add destination marker (red)
        const destinationMarker = L.marker([trackingData.destination.lat, trackingData.destination.lng])
          .addTo(map);

        // Custom icon for destination
        const redIcon = L.divIcon({
          className: 'custom-div-icon',
          html: "<div style='background-color: #dc2626; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;'></div>",
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        destinationMarker.setIcon(redIcon);
        destinationMarker.bindPopup(`<b>Destination</b><br>${trackingData.destination.address}`);

        // Draw route line
        const routeLine = L.polyline([
          [trackingData.currentLocation.lat, trackingData.currentLocation.lng],
          [trackingData.destination.lat, trackingData.destination.lng]
        ], {color: 'blue', weight: 3, opacity: 0.7}).addTo(map);

        // Fit map to show both markers
        const group = new L.featureGroup([currentMarker, destinationMarker]);
        map.fitBounds(group.getBounds().pad(0.1));

        setMapLoaded(true);
      }
    };

    loadLeaflet();

    return () => {
      // Cleanup
      const links = document.querySelectorAll('link[href*="leaflet"]');
      const scripts = document.querySelectorAll('script[src*="leaflet"]');
      links.forEach(link => link.remove());
      scripts.forEach(script => script.remove());
    };
  }, []);

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/${trackingData.currentLocation.lat},${trackingData.currentLocation.lng}/${trackingData.destination.lat},${trackingData.destination.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-[80dvh] bg-accent rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-primary text-white rounded-t-lg">
        <button 
          onClick={onBack}
          className="mr-4 hover:bg-white p-2 rounded"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Track View</h1>
      </div>

      <div className="p-6">
        {/* Map Container */}
        <div className="bg-gray-100 rounded-lg mb-6 relative">
          <div 
            id="tracking-map" 
            className="w-full h-96 rounded-lg"
            style={{ minHeight: '400px' }}
          >
            {!mapLoaded && (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading map...</div>
              </div>
            )}
          </div>
          
          {/* Map Legend */}
          <div className="absolute top-4 right-4 bg-accent rounded-lg p-3 shadow-lg">
            <div className="text-xs font-medium mb-2">Live Map: Route Line with Stops</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Current Location</span>
            </div>
            <div className="flex items-center gap-2 text-xs mt-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Destination</span>
            </div>
          </div>
        </div>

        {/* Trip Details Table */}
        <div className="bg-background rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 px-3 font-medium text-primary">Order Details</th>
                  <th className="text-left py-2 px-3 font-medium text-primary">Vehicle</th>
                  <th className="text-left py-2 px-3 font-medium text-primary">Driver Info</th>
                  <th className="text-left py-2 px-3 font-medium text-primary">Phone No</th>
                  <th className="text-left py-2 px-3 font-medium text-primary">Route</th>
                  <th className="text-left py-2 px-3 font-medium text-primary">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-3 font-medium text-primary">{trackingData.orderId}</td>
                  <td className="py-3 px-3 text-primary">{trackingData.vehicle}</td>
                  <td className="py-3 px-3 text-primary">{trackingData.driverName}</td>
                  <td className="py-3 px-3 text-primary">{trackingData.phone}</td>
                  <td className="py-3 px-3 text-primary">{trackingData.route}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {trackingData.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 justify-center">
            <Button
              onClick={handleGetDirections}
              title="Get Directions"
              icon={<Navigation size={16} />}
              iconPosition="left"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            />
            <Button
              onClick={() => window.open(`tel:${trackingData.phone}`, '_self')}
              title="Call Driver"
              icon={<Phone size={16} />}
              iconPosition="left"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}