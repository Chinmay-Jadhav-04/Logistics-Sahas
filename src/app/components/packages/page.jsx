'use client';
import { MoveRight, Leaf, Globe, Users, Truck, Plane, Package, Ship } from 'lucide-react';
import { useState } from 'react';

export default function Packages() {
    const [activeFilter, setActiveFilter] = useState('All');

    const icons2 = [
        { label: "Sustainability First", icon: <Leaf size={36} />, p: "Committed to reducing carbon footprint through innovative solutions." },
        { label: "Global Network", icon: <Globe size={36} />, p: "Connected worldwide with reliable partners and efficient routes." },
        { label: "Expert Team", icon: <Users size={36} />, p: "Professional staff dedicated to your logistics needs." },
    ];

    const packages = [
        {
            title: "Mumbai CFS",
            icon: <Ship size={24} />,
            features: ["Container Freight", "Port Handling", "Custom Clearance"],
            category: "CFS Plus"
        },
        {
            title: "Concor DRT CFS",
            icon: <Truck size={24} />,
            features: ["Same Day Delivery", "Door to Door", "Real-time Tracking"],
            category: "CFS Transport"
        },
        {
            title: "SeaBird CFS",
            icon: <Plane size={24} />,
            features: ["Air Freight", "Express Shipping", "Global Coverage"],
            category: "CFS Package"
        },
        {
            title: "CWC CFS",
            icon: <Package size={24} />,
            features: ["Local Delivery", "Warehousing", "Distribution"],
            category: "CFS Plus"
        },
        {
            title: "Ocean Gate CFS",
            icon: <Ship size={24} />,
            features: ["European Hub", "Port Services", "Consolidation"],
            category: "CFS Transport"
        },
        {
            title: "Navkar Corportion CFS",
            icon: <Truck size={24} />,
            features: ["US Distribution", "Custom Brokerage", "Storage"],
            category: "CFS Package"
        }
    ];

    const filterCategories = ['All', 'CFS Plus', 'CFS Transport', 'CFS Package'];

    const filteredPackages = activeFilter === 'All' 
        ? packages 
        : packages.filter(pkg => pkg.category === activeFilter);

    const handleFilterClick = (category) => {
        setActiveFilter(category);
    };

    return (
        <div>
            <section className="py-16 bg-accent border border-bg-black text-center">
                <h1 className="text-xl sm:text-2xl mr-5 md:text-3xl lg:text-4xl font-bold text-black mb-4 text-center ">
                    Pioneering Sustainable Global Logistics
                </h1>
                <p className="text-sm sm:text-base  lg:text-lg text-center text-black mb-12 max-w-xl mx-auto ">
                    Our eco-conscious initiatives help preserve our planet while delivering exceptional service.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-4 sm:px-6 md:px-20">
                    {icons2.map((icon, index) => (
                        <div key={index} className="flex flex-col items-center max-w-xs text-center">
                            <div className="text-primary mb-3 text-2xl sm:text-3xl md:text-4xl">{icon.icon}</div>
                            <p className="text-base sm:text-lg font-bold text-[#0e1d07] mb-1">{icon.label}</p>
                            <p className="text-xs sm:text-sm text-gray-600">{icon.p}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-accent border border-bg-black py-12">
                <div className="mx-auto w-[90%] relative ">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <h1 className="text-black text-2xl font-bold text-center sm:text-left">Our Packages</h1>
                        
                        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 lg:gap-6">
                            {filterCategories.map((category) => (
                                <button 
                                    key={category}
                                    onClick={() => handleFilterClick(category)}
                                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                                        activeFilter === category 
                                            ? 'bg-primary text-white shadow-md' 
                                            : 'text-black hover:text-primary hover:bg-white hover:shadow-sm'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        
                        </div>
                    </div>

                    <section className="cards flex gap-10 flex-wrap justify-center mt-10 mb-10 px-5">
                        {filteredPackages.map((pkg, index) => (
                            <div key={index} className="bg-white border border-bg-black h-65 w-90 p-5 rounded-lg shadow-md flex flex-col justify-between transform transition duration-300 hover:scale-[1.03] hover:shadow-lg">
                                <div className="text-[#1D49AB] mb-2">{pkg.icon}</div>
                                <h2 className="text-xl font-bold text-black mb-2">{pkg.title}</h2>
                                
                                <div className="mb-3">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                        {pkg.category}
                                    </span>
                                </div>

                                <ul className="text-sm text-gray-600 mb-4 space-y-2">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <MoveRight size={16} className="text-[#2E6F40] mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button className="bg-primary text-white px-5 py-1.5 rounded-md mt-auto self-center sm:self-start sm:ml-6 sm:px-[100px] hover:bg-opacity-90 transition-colors">
                                    Get Quote
                                </button>
                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </div>
    );
}