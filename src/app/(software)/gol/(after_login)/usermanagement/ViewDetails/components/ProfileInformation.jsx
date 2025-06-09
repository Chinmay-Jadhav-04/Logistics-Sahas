import React from 'react';

const ProfileInformation = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
      </div>
      
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-green-50">
              {user?.name || 'John Anderson'}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-green-50">
              {user?.emailId || 'john.anderson@company.com'}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-green-50">
              {user?.phoneNo || '+1 (555) 123-4567'}
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <div className="relative">
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="IT Department">IT Department</option>
                <option value="HR Department">HR Department</option>
                <option value="Finance Department">Finance Department</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="px-3 py-2 border border-gray-300 rounded-md bg-green-50">
              New York, USA
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;