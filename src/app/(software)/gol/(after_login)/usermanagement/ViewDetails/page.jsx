import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import sampleData from '@/constants/UserSampleData'; // Import sample data

// Import the new components
import ProfileInformation from './ProfileInformation';
import RolesAndPermissions from './RolesAndPermissions';
import AccountStatus from './AccountStatus';
import AccountDetails from './AccountDetails';

const ViewDetails = () => {
  const router = useRouter();
  const params = useParams();
  const { data } = useCollection('users');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // Combine sample data with collection data (same as in MobileUserTable)
      const combinedData = [...sampleData, ...(data || [])];
      const foundUser = combinedData.find(u => u.id === params.id);
      
      if (foundUser) {
        setUser(foundUser);
      }
      setLoading(false);
    }
  }, [data, params.id]);

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
            
            {/* Profile Information Component */}
            <ProfileInformation user={user} />

            {/* Roles and Permissions Component */}
            <RolesAndPermissions user={user} />

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
            
            {/* Account Status Component */}
            <AccountStatus user={user} />

            {/* Account Details Component */}
            <AccountDetails user={user} />

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