import React from 'react';
import { toast } from 'sonner';

const AccountStatus = ({ user }) => {
  const handleStatusChange = (newStatus) => {
    // Handle status change logic here
    toast.success(`Status changed to ${newStatus}`);
  };

  const handleResetPassword = () => {
    // Handle reset password logic
    toast.success('Password reset link sent to user');
  };

  return (
    <div className="space-y-6">
      
      {/* Account Status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
        </div>
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Currently Active</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Status
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blacklist">Blacklist</option>
            </select>
          </div>
          
          <p className="text-xs text-gray-500">
            Changing the account status will affect user's access to the system
          </p>
        </div>
      </div>

      {/* Reset Password */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">  
          <button
            onClick={handleResetPassword}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium"
          >
            Reset Password
          </button>
        </div>
      </div>

    </div>
  );
};

export default AccountStatus;