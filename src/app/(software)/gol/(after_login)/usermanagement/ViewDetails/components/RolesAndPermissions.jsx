import React from 'react';

const RolesAndPermissions = ({ user }) => {
  const permissions = [
    'CFS Access',
    'Customer Management', 
    'Report Access',
    'System Settings'
  ];

  return (
    <div className="bg-white shadow rounded-lg mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Role & Permissions</h2>
      </div>
      
      <div className="px-6 py-6">
        
        {/* Role */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="relative">
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="Super Admin">Super Admin</option>
              <option value="CFS Admin">CFS Admin</option>
              <option value="CFS Viewer">CFS Viewer</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
        </div>

        {/* Access Rights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Access Rights
          </label>
          <div className="space-y-3">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`permission-${index}`}
                  defaultChecked
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`permission-${index}`}
                  className="ml-3 text-sm text-gray-700"
                >
                  {permission}
                </label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RolesAndPermissions;