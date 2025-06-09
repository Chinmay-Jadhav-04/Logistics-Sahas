import React from 'react';
import { Clock, Calendar, Shield } from 'lucide-react';

const AccountDetails = ({ user }) => {
  return (
    <div className="space-y-6">
      
      {/* Last Login */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Last Login</h3>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm text-gray-900">Today at 2:30 PM</span>
          </div>
        </div>
      </div>

      {/* Account Created */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Account Created</h3>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-900">January 15, 2023</span>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-gray-500" />
            <span className="text-sm text-gray-900">Add an extra layer of security</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AccountDetails;