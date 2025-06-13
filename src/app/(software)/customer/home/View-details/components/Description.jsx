import React from 'react';
import {
  MapPin, Box, Clock, Hash, Calendar, Edit, Package
} from 'lucide-react';

const Description = ({
  description,
  facilities = [],
  isEditable = false,
  onEdit,
  userRole = 'user',
}) => {
  const canEdit = isEditable && userRole === 'admin';

  const handleEditClick = () => {
    if (onEdit) onEdit('description');
  };

  return (
    <div className="space-y-6">
      {/* Facilities Grid */}
      <div className="bg-accent rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Package className="w-5 h-5 mr-3 text-primary" />
              <div>
                <div className="text-xs text-primary">Capacity</div>
                <div className="text-sm font-medium text-primary">1200 containers</div>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Clock className="w-5 h-5 mr-3 text-primary" />
              <div>
                <div className="text-xs text-primary">Operating Hours</div>
                <div className="text-sm font-medium text-primary">8 AM - 8 PM</div>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Hash className="w-5 h-5 mr-3 text-primary" />
              <div>
                <div className="text-xs text-primary">CFS Code</div>
                <div className="text-sm font-medium text-primary">GOL-CFS-001</div>
              </div>
            </div>
            <div className="flex items-center border p-3 rounded-md bg-background">
              <Calendar className="w-5 h-5 mr-3 text-primary" />
              <div>
                <div className="text-xs text-primary">Registered Since</div>
                <div className="text-sm font-medium text-primary">Jan 2023</div>
              </div>
            </div>
          </div>

          {/* Right: Facility Tags */}
          <div className="border p-4 rounded-md h-full">
            <div className="text-sm font-medium text-primary mb-2">Facilities</div>
            <div className="flex flex-wrap gap-2">
              {facilities.length ? (
                facilities.map((facility, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-background text-primary rounded-full"
                  >
                    {facility}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-600">No facilities listed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-accent rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Box className="h-6 w-6 mr-3 text-primary" />
            <h3 className="text-xl font-semibold text-primary">About this facility</h3>
          </div>
          {canEdit && (
            <button
              onClick={handleEditClick}
              className="p-2 rounded hover:bg-gray-100"
              title="Edit Description"
            >
              <Edit className="h-5 w-5 text-primary" />
            </button>
          )}
        </div>
        <p className="text-light-primary">
          {description || 'No description available for this facility.'}
        </p>
      </div>
    </div>
  );
};

export default Description;
