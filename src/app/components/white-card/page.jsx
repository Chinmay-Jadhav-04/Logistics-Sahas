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

  const icons = [
    { label: "CFS", icon: <Package size={24} /> },
    { label: "Transport", icon: <Truck size={24} /> },
    { label: "3PL", icon: <Handshake size={24} /> },
    { label: "Warehouse", icon: <Warehouse size={24} /> },
    { label: "Customs", icon: <ShieldCheck size={24} /> },
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: fromLocation,
      tariff: tariffRange.toString(),
      freeDays: freeDaysRange.toString(),
      service: 'cfs'
    });
    router.push(`/customer/home?${searchParams.toString()}`);
  };

  return (
    <div>
      <section className="hidden sm:flex justify-center items-center h-screen w-full">
        <div className="white-card relative min-h-[90dvh] w-[90%] bg-background rounded-lg shadow-lg">

        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[58%] h-1 bg-[#16A34A] z-0" />

           <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[60%] flex justify-between z-10">
            {icons.map((icon, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-green-100 text-green-700 p-3 rounded-full mt-3">
                  {icon.icon}
                </div>
                <p className="mt-2 text-sm font-medium text-black text-center">{icon.label}</p>
              </div>
            ))}
          </div>

         
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-[85%] max-w-5xl">
            <div className="bg-white/95 backdrop-blur-sm p-12 rounded-2xl shadow-2xl border border-gray-100">

            
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-2">What Are You Looking For ?</h2>
                <p className="text-light-primary">Enter your requirements to discover the best for your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
               
                <div className="space-y-3">
                  <label className=" text-lg font-semibold text-light-primary mb-4 flex items-center gap-2">
                    <MapPin /> Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-lg placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-sm text-light-primary mt-2 flex items-center gap-2">
                    <Calendar /> Select your preferred CFS area
                  </p>
                </div>

        
                <div className="space-y-3">
                  <label className=" text-lg font-semibold text-light-primary mb-4 flex items-center gap-2">
                    <IndianRupee /> Tariff Rate
                  </label>
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">₹{tariffRange.toLocaleString()}</span>
                      <span className="text-sm text-primary">Max Budget</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="1000"
                      value={tariffRange}
                      onChange={(e) => setTariffRange(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10B981 0%, #10B981 ${((tariffRange - 5000) / (100000 - 5000)) * 100}%, #E5E7EB ${((tariffRange - 5000) / (100000 - 5000)) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-primary mt-2">
                      <span>₹5K</span>
                      <span>₹1L</span>
                    </div>
                  </div>
                  <p className="text-sm text-light-primary mt-2 flex items-center gap-2">
                    <Lightbulb /> Drag to set your budget range
                  </p>
                </div>

            
                <div className="space-y-3">
                  <label className=" text-lg font-semibold text-light-primary mb-4 flex items-center gap-2">
                    <Clock /> Free Days
                  </label>
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">{freeDaysRange}</span>
                      <span className="text-sm text-primary">Days</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="1"
                      value={freeDaysRange}
                      onChange={(e) => setFreeDaysRange(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(freeDaysRange / 15) * 100}%, #E5E7EB ${(freeDaysRange / 15) * 100}%, #E5E7EB 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-primary mt-2">
                      <span>1 Day</span>
                      <span>15 Days</span>
                    </div>
                  </div>
                  <p className="text-sm text-light-primary mt-2 flex items-center gap-2">
                    <Calendar /> Up to {freeDaysRange} free storage days
                  </p>
                </div>
              </div>

             
              <div className="text-center">
                <button
                  onClick={handleSearch}
                  disabled={!fromLocation}
                  className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Search
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
                <p className="text-sm text-light-primary mt-4 flex items-center gap-2 justify-center">
                  <Rocket /> Find the perfect solution in seconds
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
