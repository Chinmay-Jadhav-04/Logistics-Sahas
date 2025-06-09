'use client'
import { TruckIcon } from 'lucide-react'
import React from 'react'

const Transport = () => {
  const transports = [
    { id: 1, name: 'Vehicle No, Route, Driver, Track Button', icon: <TruckIcon /> }
  ];

  const addTransport = () => {
    console.log("Add Transport");
  };

  return (
    <div className="bg-background border rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Transport Details</h2>

        <div className="flex space-x-2">
          <button
            onClick={addTransport}
            className="text-green-600 px-3 py-1 rounded text-sm flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </button>

          <button className="text-blue-600 px-3 py-1 rounded text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>

          <button className="text-red-600 px-3 py-1 rounded text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

   
      <div className="flex items-center space-x-3 text-foreground">
        <span className="text-xl">{transports[0].icon}</span>
        <span className="font-medium">{transports[0].name}</span>
      </div>
    </div>
  );
};

export default Transport;
