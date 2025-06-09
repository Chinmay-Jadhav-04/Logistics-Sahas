'use client';

import React, { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarProvider';
import Table from './component/Table';

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState('CFS');
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('User Management');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header Section */}
        <div className="bg-background border rounded-lg shadow-sm px-4 md:px-8 py-6 mb-6">
          <div className="flex flex-col gap-4">
            
            {/* Title */}
            <h1 className="text-2xl font-semibold text-foreground">
              User Management Page
            </h1>
            <p className="text-sm text-gray-600">
              Manage user access and roles
            </p>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
              <button
                onClick={() => setActiveTab('CFS')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'CFS'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Clients
              </button>
              <button
                onClick={() => setActiveTab('Customer')}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'Customer'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Customers
              </button>
            </div>

          </div>
        </div>

        {/* Table Component */}
        <Table activeTab={activeTab} />
        
      </div>
    </div>
  );
};

export default UserManagementPage;