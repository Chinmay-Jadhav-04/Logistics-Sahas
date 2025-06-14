import React, { useEffect, useState } from 'react';
import { Search, Edit, Shield, ShieldCheck, X, Check, PackageOpen, Building, Truck, Castle, Anchor, Train } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import EditForm from './EditForm';

export default function MobileServiceProviderList() {
  const { data, updateItem, mutation } = useCollection('gol_service-providers');
  const { user } = useAuth();
  console.log(data);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProviders, setFilteredProviders] = useState([]);

  // Sample data for display when no real data exists
  const sampleProviders = [
    {
      id: 1,
      providerName: 'Swift Container Lines',
      type: 'CFS',
      location: 'Mumbai',
      access: 'Allowed'
    },
    {
      id: 2,
      providerName: 'Fast Ship Ltd',
      type: 'ICD',
      location: 'Ahmedabad',
      access: 'Not Allowed'
    },
    {
      id: 3,
      providerName: 'Ocean Drive Freight',
      type: 'Transport',
      location: 'Delhi',
      access: 'Not Allowed'
    },
    {
      id: 4,
      providerName: 'Zenith Global Packers',
      type: 'CFS',
      location: 'Chennai',
      access: 'Allowed'
    }
  ];

  const displayData = data?.length > 0 ? data : sampleProviders;

  useEffect(() => {
    if (displayData?.length > 0) {
      const filtered_Providers = displayData.filter(provider => {
        const matchesSearch =
          provider?.providerName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          provider?.type?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          provider?.location?.toLowerCase()?.includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      setFilteredProviders(filtered_Providers);
    } else {
      setFilteredProviders([]);
    }
  }, [displayData, searchQuery]);

  const getAccessBadgeClass = (access) => {
    switch (access) {
      case 'Allowed':
        return 'bg-green-100 text-green-800';
      case 'Not Allowed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'CFS':
        return <PackageOpen className="text-primary text-sm"/>;
      case 'ICD':
        return <Building className="text-primary text-sm"/>;
      case 'Transport':
        return <Truck className="text-primary text-sm"/>;
      case 'Warehouse':
        return <Castle className="text-primary text-sm"/>;
      case 'Port':
        return <Anchor className="text-primary text-sm"/>;
      default:
        return <Train className="text-primary text-sm "/>;
    }
  };

  const handleAccessToggle = async (providerId, currentAccess) => {
    const newAccess = currentAccess === 'Allowed' ? 'Not Allowed' : 'Allowed';
    try {
      await updateItem(providerId, {
        access: newAccess,
        updatedBy: user.id
      });
      toast.success(`Provider access ${newAccess.toLowerCase()}`);
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    } finally {
      mutation()
    }
  }

  return (
    <div className="border rounded-xl flex flex-col p-4">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Service Providers</h2>
        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by provider name, type, or location"
              className="pl-8 w-full bg-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <div key={provider.id || index} className="bg-[var(--accent)] rounded-lg p-3 mb-3 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(provider.type)}</span>
                    <div className="font-medium text-lg">{provider.providerName}</div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <span className={`text-xs px-2 py-1 rounded-full ${getAccessBadgeClass(provider.access)}`}>
                      {provider.access}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-primary mb-1">
                  <strong>Type:</strong> {provider.type}
                </div>
                <div className="text-sm text-primary mb-2">
                  <strong>Location:</strong> {provider.location}
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className='flex gap-3 items-center'>
                    <EditForm info={provider} />
                    <button
                      className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                        provider.access === 'Allowed' 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-light-primary text-white hover:bg-primary'
                      }`}
                      onClick={() => handleAccessToggle(provider.id, provider.access)}
                    >
                      {provider.access === 'Allowed' ? (
                        <>
                          <X size={14} />
                          Revoke
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          Allow
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No service providers found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}