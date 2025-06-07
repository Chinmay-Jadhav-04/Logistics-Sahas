'use client'
import React, { useState } from 'react'

const Facility = () => {
  const [facilities, setFacilities] = useState([
    { id: 1, name: 'Forklift, Cranes, Scanner', icon: '🏗️' }
  ])
  const [newFacility, setNewFacility] = useState('')

  const addFacility = () => {
    if (newFacility.trim()) {
      setFacilities([...facilities, { 
        id: Date.now(), 
        name: newFacility.trim(), 
        icon: '🏢' 
      }])
      setNewFacility('')
    }
  }

  const editFacility = (id, newName) => {
    setFacilities(facilities.map(facility => 
      facility.id === id ? { ...facility, name: newName } : facility
    ))
  }

  const deleteFacility = (id) => {
    setFacilities(facilities.filter(facility => facility.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Facility Details</h2>
        <div className="flex space-x-2">
          <button
            onClick={addFacility}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Add Facility Input */}
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          value={newFacility}
          onChange={(e) => setNewFacility(e.target.value)}
          placeholder="Enter new facility details..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addFacility()}
        />
        <button
          onClick={addFacility}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Facility
        </button>
      </div>

      {/* Facilities List */}
      <div className="space-y-3">
        {facilities.map((facility) => (
          <FacilityItem
            key={facility.id}
            facility={facility}
            onEdit={editFacility}
            onDelete={deleteFacility}
          />
        ))}
      </div>
    </div>
  )
}

const FacilityItem = ({ facility, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(facility.name)

  const handleSave = () => {
    onEdit(facility.id, editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(facility.name)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <span className="text-2xl">{facility.icon}</span>
      
      {isEditing ? (
        <div className="flex-1 flex space-x-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="flex-1 font-medium">{facility.name}</span>
          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(facility.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Facility