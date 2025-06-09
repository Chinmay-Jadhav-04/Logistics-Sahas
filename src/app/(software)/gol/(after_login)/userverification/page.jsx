'use client';

import React, { useEffect, useState } from 'react';
import Warehouse from './components/warehouse';
import Transport from './components/transport';
import Facility from './components/facility';
import Services from './components/services';
import Cfsdetails from './components/Cfsdetails';
import Customerdetails from './components/Customerdetails';
import { useSidebar } from '@/contexts/SidebarProvider';

const UserVerificationPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('CFS');
  const [verificationStatus, setVerificationStatus] = useState('Approved');
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('User Verification View Details');
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="shadow-sm">    
<div className="bg-background border rounded-lg shadow-sm px-4 md:px-8 py-6">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
    
    <div className="flex flex-col gap-4">
      <h1 className={`font-semibold text-foreground ${isMobile ? 'text-xl' : 'text-2xl'}`}>
        User Verification View Details
      </h1>

      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('CFS')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'CFS'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          CFS
        </button>
        <button
          onClick={() => setActiveTab('Customer')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'Customer'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Customer
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setVerificationStatus('Approved')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            verificationStatus === 'Approved'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          ✓ Approved
        </button>
        <button
          onClick={() => setVerificationStatus('Rejected')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            verificationStatus === 'Rejected'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 text-red-700'
          }`}
        >
          ✕ Rejected
        </button>
      </div>
    </div>


    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search by name/email/contact..."
        className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 ${
          isMobile ? 'w-48 text-sm' : 'w-64'
        }`}
      />
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Search
      </button>
    </div>
  </div>
</div>

         
      
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">   
          {activeTab === 'CFS' ? <Cfsdetails /> : <Customerdetails />}
          <Services />
          <Facility />
          <Transport />
          <Warehouse />
        </div>
      </div>
    </div>
  );
};

export default UserVerificationPage;
