import React from 'react';
import {
  MapPin,
  Box,
  Clock,
  Hash,
  Calendar,
  CheckCircle,
  Edit,
  Package,
} from 'lucide-react';

const Description = ({
  description,
  facilities = [],
  isEditable = false,
  onEdit,
  userRole = 'user',
}) => {
  const canEdit = isEditable && userRole === 'admin';

  const handleEditClick = (type) => {
    if (onEdit) onEdit(type);
  };

  return (
    <div className="space-y-6">
      {/* Info Section */}
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {/* Status & Location */}
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#2E6F40] text-white">
            Active
          </span>
          <div className="flex items-center rounded-full px-3 py-1 text-sm bg-[#2E6F40] text-white">
            <MapPin className="h-4 w-4 mr-1 text-white" />
            Mumbai, India
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Info Card Template */}
          <div className="flex items-center border p-3 rounded-md bg-white">
            <Package className="w-5 h-5 mr-3 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Capacity</div>
              <div className="text-sm font-medium text-gray-800">1200 containers</div>
            </div>
          </div>

          <div className="flex items-center border p-3 rounded-md bg-white">
            <Clock className="w-5 h-5 mr-3 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Operating Hours</div>
              <div className="text-sm font-medium text-gray-800">8 AM - 8 PM</div>
            </div>
          </div>

          <div className="flex items-center border p-3 rounded-md bg-white">
            <Hash className="w-5 h-5 mr-3 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">CFS Code</div>
              <div className="text-sm font-medium text-gray-800">GOL-CFS-001</div>
            </div>
          </div>

          <div className="flex items-center border p-3 rounded-md bg-white">
            <Calendar className="w-5 h-5 mr-3 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Registered Since</div>
              <div className="text-sm font-medium text-gray-800">Jan 2023</div>
            </div>
          </div>

          {/* Facilities as Badges */}
          <div className="border p-4 rounded-md lg:col-span-1 md:col-span-2">
            <div className="text-sm text-gray-500 mb-2 font-medium">Facilities</div>
            <div className="flex flex-wrap gap-2">
              {facilities.length > 0 ? (
                facilities.map((facility, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
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
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div className="p-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Box className="h-6 w-6 mr-3 text-gray-700" />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                About this facility
              </h3>
            </div>
            {canEdit && (
              <button
                onClick={() => handleEditClick('description')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Edit Description"
              >
                <Edit className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
          <p className="text-gray-700 leading-relaxed text-base" style={{ color: 'var(--secondary)' }}>
            {description || 'No description available for this facility.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
