import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Clock, Shield, Settings } from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';

const ViewDetails = () => {
  const router = useRouter();
  const params = useParams();
  const { data } = useCollection('users');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && params.id) {
      const foundUser = data.find(u => u.id === params.id);
      if (foundUser) {
        setUser(foundUser);
      }
      setLoading(false);
    }
  }, [data, params.id]);

  const handleStatusChange = (newStatus) => {
    // Handle status change logic here
    toast.success(`Status changed to ${newStatus}`);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete this account?')) {
      // Handle delete account logic
      toast.success('Account deleted successfully');
      router.back();
    }
  };

  const handleSaveChanges = () => {
    // Handle save changes logic
    toast.success('Changes saved successfully');
  };

  const handleResetPassword = () => {
    // Handle reset password logic
    toast.success('Password reset link sent to user');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-8">The user you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()} className="bg-green-600 hover:bg-green-700">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">View Details</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
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
                      {user.name || 'John Anderson'}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-green-50">
                      {user.emailId || 'john.anderson@company.com'}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-green-50">
                      {user.phoneNo || '+1 (555) 123-4567'}
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

            {/* Role & Permissions */}
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
                    {[
                      'CFS Access',
                      'Customer Management', 
                      'Report Access',
                      'System Settings'
                    ].map((permission, index) => (
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

            {/* Delete Account Section */}
            <div className="bg-white shadow rounded-lg mt-6">
              <div className="px-6 py-6">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium"
                >
                  Delete Account
                </button>
              </div>
            </div>

          </div>

          {/* Sidebar */}
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
        </div>

        {/* Save Changes Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewDetails;
