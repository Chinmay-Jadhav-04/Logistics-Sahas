'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star, ArrowLeft } from 'lucide-react';
import Photos from './components/Photos';
import Description from './components/Description';
import Location from './components/Location';
import { useCollection } from '@/hooks/useCollection';
import { PB_URL } from '@/constants/url';

const ViewDetailsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cfsId = searchParams.get('id');

  const { data: providers, loading } = useCollection('service_provider', {
    expand: 'service'
  });

  const cfsProvider = providers?.find(provider => provider.id === cfsId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E8F3EB] flex items-center justify-center">
        <p className="text-gray-600">Loading CFS details...</p>
      </div>
    );
  }

  if (!cfsProvider) {
    return (
      <div className="min-h-screen bg-[#E8F3EB] flex items-center justify-center">
        <p className="text-gray-600">CFS not found.</p>
      </div>
    );
  }

  const imageUrls = cfsProvider.files?.map(filename =>
    `${PB_URL}/api/files/service_provider/${cfsProvider.id}/${filename}`
  ) || [];

  const facilities = [
    'Container Storage',
    'Customs Clearance',
    'Cargo Handling',
    'Documentation',
    'Security Services',
    '24/7 Operations'
  ];

  return (
  <div>
    <div className="min-h-screen bg-accent py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/customer/home')}
          className="flex items-center border border-bg-foreground bg-background rounded-lg p-2 text-primary font-semibold hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="bg-accent rounded-lg border shadow-sm p-6">
          <h1 className="text-2xl font-bold text-primary">{cfsProvider.title}</h1>
          <p className="text-sm text-light-primary mb-3">{cfsProvider.location}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
              <span className="font-medium">{cfsProvider.rating?.toFixed(1) || '0.0'}</span>
              <span className="text-sm text-light-primary ml-1">rating</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cfsProvider.tags?.tags?.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 text-sm bg-background text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="rounded-lg border shadow-sm p-6">
          <Photos images={imageUrls} title={cfsProvider.title} />
        </div>

        {/* Facilities Grid + Facility Tags */}
        <Description
          description={cfsProvider.description}
          facilities={facilities}
          isEditable={false}
          userRole="user"
        />

        {/* Location */}
        <div className="rounded-lg shadow-sm border p-6">
          <Location
            location={cfsProvider.location}
            address={cfsProvider.location}
            coordinates={{ lat: 19.0760, lng: 72.8777 }}
            isEditable={false}
            userRole="user"
          />
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default ViewDetailsPage;
