'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateNewServiceList = ({ onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    orderId: '',
    vehicleNo: '',
    driverName: '',
    phoneNumber: '',
    route: '',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.orderId.trim()) newErrors.orderId = 'Order ID is required';
    if (!formData.vehicleNo.trim()) newErrors.vehicleNo = 'Vehicle number is required';
    if (!formData.driverName.trim()) newErrors.driverName = 'Driver name is required';

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.route.trim()) newErrors.route = 'Route is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const serviceData = {
      ...formData,
      orderId: formData.orderId || `TRX${Date.now().toString().slice(-3)}`
    };

    if (typeof onSubmit === 'function') onSubmit(serviceData);

    // Reset form
    setFormData({
      orderId: '',
      vehicleNo: '',
      driverName: '',
      phoneNumber: '',
      route: '',
      status: 'Pending'
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      orderId: '',
      vehicleNo: '',
      driverName: '',
      phoneNumber: '',
      route: '',
      status: 'Pending'
    });
    setErrors({});
    if (typeof onCancel === 'function') onCancel();
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'On Route', label: 'On Route' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Create New Transportation Service</h3>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { label: 'Order ID', name: 'orderId', placeholder: 'e.g., TRX001' },
                { label: 'Vehicle Number', name: 'vehicleNo', placeholder: 'e.g., MH12AB1234' },
                { label: 'Driver Name', name: 'driverName', placeholder: 'Enter driver name' },
                { label: 'Phone Number', name: 'phoneNumber', placeholder: '+91-1234567890', type: 'tel' },
                { label: 'Route', name: 'route', placeholder: 'e.g., Mumbai → Delhi' }
              ].map(({ label, name, placeholder, type = 'text' }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label} *
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full border ${errors[name] ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    placeholder={placeholder}
                  />
                  {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
                </div>
              ))}

              {/* Status Dropdown */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Default props
CreateNewServiceList.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  isOpen: false
};

// Prop types
CreateNewServiceList.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool
};

export default CreateNewServiceList;
