import React, { useEffect, useState } from 'react';
import { Search, Edit, MapPin, Eye } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function MobileTransportList() {
  const { data, updateItem, mutation } = useCollection('gol_transportation-services');
  const { user } = useAuth();
  console.log(data);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const filtered_Services = data.filter(service => {
        const matchesSearch =
          service?.orderId?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          service?.vehicleNo?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          service?.driverName?.toLowerCase()?.includes(searchQuery.toLowerCase());
        return matchesSearch;
      });
      setFilteredServices(filtered_Services);
    } else {
      setFilteredServices([]);
    }
  }, [data, searchQuery]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'On Route':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (id, status = 'Pending') => {
    try {
      await updateItem(id, {
        status: status,
        updatedBy: user.id
      });
      toast.success('Updated the Service Status');
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
        <h2 className="text-xl font-semibold mb-4">Transportation Service List</h2>
        <div className="px-4 py-8 flex items-center justify-between">
          <div className="relative flex-1 mr-2">
            <Input
              type="text"
              placeholder="Search by vehicle/container no."
              className="pl-8 w-full bg-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="px-4 pb-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div key={index} className="bg-[var(--accent)] rounded-lg p-3 mb-3 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-lg">{service.orderId}</div>
                  <div className='flex gap-2 items-center'>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-primary mb-1">
                  <strong>Vehicle:</strong> {service.vehicleNo}
                </div>
                <div className="text-sm text-primary mb-1">
                  <strong>Driver:</strong> {service.driverName}
                </div>
                <div className="text-sm text-primary mb-1">
                  <strong>Phone:</strong> {service.phoneNumber}
                </div>
                <div className="text-sm text-primary mb-2">
                  <strong>Route:</strong> {service.route}
                </div>
                <div className="flex justify-end items-center pt-2 border-t">
                  <div className='flex gap-3 items-center'>
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      onClick={() => console.log('Update service', service.id)}
                    >
                      <Edit size={14} />
                      Update
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      onClick={() => console.log('Track service', service.id)}
                    >
                      <MapPin size={14} />
                      Track
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No transportation services found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}