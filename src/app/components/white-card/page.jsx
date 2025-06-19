'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Package, Warehouse, Truck, Ship, ShieldCheck,
  Search, MapPin, IndianRupee, Calendar, Clock,
  Lightbulb, Rocket,
  Handshake
} from 'lucide-react';

export default function WhiteCard() {
  const router = useRouter();
  const [fromLocation, setFromLocation] = useState('');
  const [tariffRange, setTariffRange] = useState(25000);
  const [freeDaysRange, setFreeDaysRange] = useState(7);
  const [activeService, setActiveService] = useState('cfs');

  const services = [
    { id: 'cfs', label: "CFS", icon: <Package size={24} /> },
    { id: 'transport', label: "Transport", icon: <Truck size={24} /> },
    { id: '3pl', label: "3PL", icon: <Handshake size={24} /> },
    { id: 'warehouse', label: "Warehouse", icon: <Warehouse size={24} /> },
    { id: 'customs', label: "Customs", icon: <ShieldCheck size={24} /> },
  ];

  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
  };

  const handleSearch = () => {
    if (activeService === 'customs') {
      alert('Customs service coming soon!');
      return;
    }

    const searchParams = new URLSearchParams({
      location: fromLocation,
      tariff: tariffRange.toString(),
      freeDays: freeDaysRange.toString(),
      service: activeService
    });
    router.push(`/customer/home?${searchParams.toString()}`);
  };

  const getActiveServiceIndex = () => {
    return services.findIndex(service => service.id === activeService);
  };

  const getProgressWidth = () => {
    const activeIndex = getActiveServiceIndex();
    return `${(activeIndex / (services.length - 1)) * 100}%`;
  };

  return (
    <div>
      <section className="hidden sm:flex justify-center items-center h-screen w-full relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/whitecardbg.png')`,
          }}
        />
         {/* Van Image - Positioned at bottom-right */}
          <div className="absolute bottom-4 right-4 z-20">
            <img 
              src="/Truck.png" 
              alt="Delivery Van" 
              className="w-full h-80 object-contain opacity-100"
            />
          </div>
        
        <div className="white-card relative min-h-[90dvh] w-[90%] bg-white/95 backdrop-blur-sm border rounded-lg shadow-2xl z-10">
          

          {/* Progress Line Background */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[58%] h-1 bg-gray-300 rounded-full z-0" />
          
          {/* Animated Progress Line */}
          <div 
            className="absolute top-24 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full z-0 transition-all duration-500 ease-in-out"
            style={{ 
              width: '58%',
              clipPath: `inset(0 ${100 - parseFloat(getProgressWidth())}% 0 0)`
            }}
          />

          {/* Service Icons */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[60%] flex justify-between z-10">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className={`p-3 rounded-full mt-3 transition-all duration-300 ${
                  activeService === service.id 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-blue-500 hover:bg-blue-100'
                }`}>
                  {service.icon}
                </div>
                <p className={`mt-2 text-sm font-medium text-center transition-all duration-300 ${
                  activeService === service.id 
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-600'
                }`}>
                  {service.label}
                  {service.id === 'customs' && <span className="block text-xs text-orange-500">Coming Soon</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-[85%] max-w-5xl">
            <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-2xl border border-gray-100">

              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  🔍 What Are You Looking For?
                </h2>
                <p className="text-gray-600">
                  Find the perfect {services.find(s => s.id === activeService)?.label} solution for your needs ✨
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* Location Input */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <MapPin className="text-blue-500" /> Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Select your preferred {services.find(s => s.id === activeService)?.label} area
                  </p>
                </div>

                {/* Tariff Rate */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <IndianRupee className="text-green-500" /> Max Tariff Rate
                  </label>
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-800">₹{tariffRange.toLocaleString()}</span>
                      <span className="text-sm text-gray-600">Max Budget</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={tariffRange}
                      onChange={(e) => setTariffRange(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((tariffRange - 5000) / (100000 - 5000)) * 100}%, #E5E7EB ${((tariffRange - 5000) / (100000 - 5000)) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>₹5,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Set your budget range
                  </p>
                </div>

                {/* Free Storage Days */}
                <div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Clock className="text-purple-500" /> Free Storage Days
                  </label>
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-800">{freeDaysRange}</span>
                      <span className="text-sm text-gray-600">Days</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={freeDaysRange}
                      onChange={(e) => setFreeDaysRange(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(freeDaysRange / 15) * 100}%, #E5E7EB ${(freeDaysRange / 15) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>1 Day</span>
                      <span>15 Days</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Up to {freeDaysRange} free storage days
                  </p>
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center">
                <button
                  onClick={handleSearch}
                  disabled={!fromLocation}
                  className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Search {services.find(s => s.id === activeService)?.label} Now
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
                <p className="text-sm text-gray-600 mt-4 flex items-center gap-2 justify-center">
                  <Rocket className="w-4 h-4" /> Find the perfect solution in seconds
                </p>
              </div>



            </div>
          </div>

        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3B82F6;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
          }
          
          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3B82F6;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
          }
          
          .slider::-moz-range-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
        `}</style>
      </section>
    </div>
  );
}