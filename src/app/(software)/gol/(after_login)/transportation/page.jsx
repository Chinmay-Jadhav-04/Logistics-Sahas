'use client';

import React, { useState, useEffect } from 'react';
import CreateNewServiceList from './components/Transportation-Services/CreateNewServiceList';
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/contexts/SidebarProvider";
import TransportationServiceForm from './components/Transportation-Services/TransporationServiceForm';

const TransportationPage = () => {
  const [services, setServices] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('Transportation Service Details');
  }, []);

  const handleCreateService = (newService) => {
    setServices(prev => [...prev, newService]);
    setIsCreateModalOpen(false);
    
    // Show success message (you can implement toast notification here)
    alert('Transportation service created successfully!');
  };

  const handleUpdateService = (service) => {
    // Implement update logic here
    console.log('Update service:', service);
    alert(`Update functionality for ${service.orderId} - This will be implemented next`);
  };

  const handleTrackService = (service) => {
    // Implement tracking logic here
    console.log('Track service:', service);
    alert(`Track functionality for ${service.orderId} - This will be implemented next`);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-[80dvh] bg-accent rounded-lg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Transportation Services</h1>
              <p className="mt-1 text-sm text-primary">
                Manage your transportation services and track deliveries
              </p>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              CREATE NEW
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-background overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-primary truncate">Total Services</dt>
                    <dd className="text-lg font-medium text-primary">{services.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-primary truncate">On Route</dt>
                    <dd className="text-lg font-medium text-primary">
                      {services.filter(s => s.status === 'On Route').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-primary truncate">Delivered</dt>
                    <dd className="text-lg font-medium text-primary">
                      {services.filter(s => s.status === 'Delivered').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-primary truncate">Pending</dt>
                    <dd className="text-lg font-medium text-primary">
                      {services.filter(s => s.status === 'Pending').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Service List */}
        <TransportationServiceForm
          services={services}
          onUpdate={handleUpdateService}
          onTrack={handleTrackService}
        />

        {/* Create New Service Modal */}
        <CreateNewServiceList
          isOpen={isCreateModalOpen}
          onSubmit={handleCreateService}
          onCancel={handleCloseCreateModal}
        />
      </div>
    </div>
  );
};

export default TransportationPage;