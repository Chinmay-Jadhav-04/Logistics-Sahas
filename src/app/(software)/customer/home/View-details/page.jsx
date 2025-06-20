'use client';

import React, { Suspense } from 'react';
import ViewDetailsContent from './ViewDetailsContent';

export default function ViewDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E8F3EB] flex items-center justify-center">Loading...</div>}>
      <ViewDetailsContent />
    </Suspense>
  );
}
