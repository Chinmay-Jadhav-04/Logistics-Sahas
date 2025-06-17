'use client';
import { Package, UserRound, Phone, Mail, Lock, Truck, ShieldHalf, ChartSpline } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

export default function RegistrationLoginPage({ onSubmit, formData, isLoading }) {
    const [localFormData, setLocalFormData] = useState({
        fullName: formData?.fullName || '',
        phone: formData?.phone || '',
        email: formData?.email || '',
        password: formData?.password || '',
        termsAccepted: formData?.termsAccepted || false
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setLocalFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!localFormData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!localFormData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(localFormData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!localFormData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(localFormData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!localFormData.password) {
            newErrors.password = 'Password is required';
        } else if (localFormData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(localFormData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
        }

        if (!localFormData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm() && onSubmit) {
            onSubmit(localFormData);
        }
    };

    return (
        <div className="w-full min-h-screen flex bg-[#F9FAFB]">
            <div className="bg-[#2E6F40] w-1/2 flex flex-col items-center justify-center px-10 ">
                <img src="/bgimg.jpeg" className="h-70 w-70 rounded-2xl shadow-black shadow-lg  mb-8" />
                <h1 className="text-white font-bold text-3xl mb-4 text-center">Welcome to Logistics</h1>
                <p className="text-white text-center text-lg mb-8 max-w-md">
                    Streamline your logistics operations with our comprehensive management platform. Join thousands of businesses optimizing their supply chain.
                </p>
                <div className="flex items-center justify-center gap-8 mt-4">
                    <div className="flex flex-row items-center">
                        <Truck className="text-white h-7 w-7 mr-1 " />
                        <span className="text-white text-sm">Fast Delivery</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <ShieldHalf className="text-white h-7 w-7 mr-1" />
                        <span className="text-white text-sm">Secure</span>
                    </div>
                    <div className="flex flex-row items-center">
                        <ChartSpline className="text-white h-7 w-7 mr-1" />
                        <span className="text-white text-sm">Analytics</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-1/2 min-h-screen items-center justify-center bg-[#F9FAFB] px-8">
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
                    <div className="flex items-center mb-6">
                        <Package className="text-white bg-[#166534] p-2 h-10 w-10 rounded-lg mr-3" />
                        <span className="text-2xl font-extrabold text-[#1A2E22]">Logistics</span>
                    </div>
                    <h1 className="font-extrabold text-2xl sm:text-3xl text-center mb-2 text-[#1A2E22]">Create Your Account</h1>
                    <p className="text-gray-600 text-center mb-6">Join our logistics platform and start optimizing your operations</p>
                  
                    <div className="w-full mb-3">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <UserRound size={16} className="mr-2" /> Full Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter your full name" 
                            value={localFormData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className={`border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6F40]`}
                            disabled={isLoading}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    
                  
                    <div className="w-full mb-3">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <Phone size={16} className="mr-2" /> Phone Number
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter your phone number" 
                            value={localFormData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6F40]`}
                            disabled={isLoading}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    
                 
                    <div className="w-full mb-3">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <Mail size={16} className="mr-2" /> Email Address
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            value={localFormData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6F40]`}
                            disabled={isLoading}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    

                    <div className="w-full mb-1">
                        <label className="flex items-center text-gray-500 text-sm font-medium mb-1">
                            <Lock size={16} className="mr-2" /> Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Create a strong password" 
                            value={localFormData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} w-full h-12 rounded-md px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6F40]`}
                            disabled={isLoading}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Must be at least 8 characters with uppercase, lowercase, and numbers</p>
                    
    
                    <label className="flex items-start space-x-2 mb-4 w-full">
                        <input 
                            type="checkbox" 
                            checked={localFormData.termsAccepted}
                            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                            className="h-5 w-5 border-gray-400 rounded mt-0.5" 
                            disabled={isLoading}
                        />
                        <span className="text-sm text-gray-700">
                            I agree to the
                            <a className="text-blue-600 ml-1 hover:underline cursor-pointer">Terms of Service</a>
                            and
                            <a className="text-blue-600 ml-1 hover:underline cursor-pointer">Privacy Policy</a>
                        </span>
                    </label>
                    {errors.termsAccepted && <p className="text-red-500 text-xs mb-2 w-full">{errors.termsAccepted}</p>}
                    
   
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#166534] text-white w-full h-12 rounded-md font-semibold text-lg mt-2 hover:bg-[#14532d] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                Next <span className="ml-2">&#8594;</span>
                            </>
                        )}
                    </button>
                    
               
                    <p className="mt-6 text-center text-gray-700 text-sm">
                        Already have an account?
                        <a href="#" className="text-blue-600 ml-1 font-medium hover:underline">Sign In</a>
                    </p>
                    
           
                    <div className="flex items-center w-full my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    
               
                    <button 
                        type="button"
                        disabled={isLoading}
                        className="border border-gray-300 h-12 w-full rounded-md flex items-center justify-center gap-3 bg-white hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FcGoogle size={22} />
                        <span className="text-base font-medium text-gray-700">Google</span>
                    </button>
                </form>
            </div>
        </div>
    );
}