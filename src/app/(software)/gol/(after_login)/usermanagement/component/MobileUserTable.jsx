import React, { useEffect, useState } from 'react';
import { Search, Eye, Trash, Edit, Settings, User } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import sampleData from '@/constants/UserSampleData';

export default function MobileUserTable({ activeTab, searchQuery, onSearchChange }) {
  const { data, deleteItem, updateItem, mutation } = useCollection('users');
  const { user } = useAuth();
  const router = useRouter();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    // Always use sample data first, then add any additional data from the collection
    const combinedData = [...sampleData, ...(data || [])];
    
    const filtered = combinedData.filter(item => {
      const matchesTab = activeTab === 'CFS' ? 
        (item.role === 'CFS Admin' || item.role === 'CFS Viewer') : 
        (item.role === 'Customer');
      
      const matchesSearch = searchQuery === '' || 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.emailId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phoneNo?.includes(searchQuery);
      
      return matchesTab && matchesSearch;
    });
    setFilteredUsers(filtered);
  }, [data, activeTab, searchQuery]);

  const handleViewDetails = (userId) => {
    router.push(`/gol/usermanagement/ViewDetails`);
  };

  const handleEditUser = (userId) => {
    router.push(`/gol/usermanagement/edit/${userId}`);
  };

  const handleUserSettings = (userId) => {
    router.push(`/gol/usermanagement/settings/${userId}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Blacklist':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateItem(id, { status });
      toast.success('Status updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      mutation();
    }
  };

  const handleDeleteUser = async (userData) => {
    const confirmation = confirm(`Are you sure you want to delete ${userData.name}?`);
    if (confirmation) {
      setIsDeleting(userData.id);
      try {
        await deleteItem(userData.id);
        toast.success('User deleted successfully');
        mutation();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete user');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="border rounded-xl flex flex-col p-4 bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {activeTab === 'CFS' ? 'CFS Details' : 'Customer Details'}
          </h2>
          <div className="text-sm text-foreground">
            {filteredUsers.length} users
          </div>
        </div>
        
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by name, email or phone..."
              className="pl-8 w-full bg-accent"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredUsers.map((userData, index) => (
            <div key={userData.id || index} className="bg-accent rounded-lg p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  <div className="font-medium text-lg">{userData.name}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(userData.status)}`}>
                  {userData.status}
                </span>
              </div>
              
              <div className="space-y-1 mb-3">
                <div className="text-sm text-foreground">
                  <span className="font-medium">Email:</span> {userData.emailId}
                </div>
                <div className="text-sm text-foreground">
                  <span className="font-medium">Phone:</span> {userData.phoneNo}
                </div>
                <div className="text-sm text-foreground">
                  <span className="font-medium">Role:</span> {userData.role}
                </div>
                <div className="text-sm text-foreground">
                  <span className="font-medium">Access:</span> {userData.access}
                </div>
              </div>
              
              <div className="flex justify-end items-center pt-3 border-t border-gray-200">
                <div className="flex gap-3 items-center">
                  <Eye
                    size={18}
                    className="cursor-pointer text-primary hover:text-primary/80 transition-colors"
                    onClick={() => handleViewDetails(userData.id)}
                    title="View Details"
                  />
                  <Edit
                    size={18}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => handleEditUser(userData.id)}
                    title="Edit User"
                  />
                  <Settings
                    size={18}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={() => handleUserSettings(userData.id)}
                    title="Settings"
                  />
                  <Trash
                    size={18}
                    className={`cursor-pointer text-red-600 hover:text-red-800 transition-colors ${
                      isDeleting === userData.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => !isDeleting && handleDeleteUser(userData)}
                    title="Delete User"
                  />
                </div>
              </div>
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-foreground">
              <User size={48} className="mx-auto mb-4 opacity-50" />
              <p>No users found</p>
              {searchQuery && (
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your search terms
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}