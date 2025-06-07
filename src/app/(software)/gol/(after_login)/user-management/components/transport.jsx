'use client'
import React, { useState } from 'react'

const Transport = () => {
  const [transports, setTransports] = useState([
    { id: 1, name: 'Vehicle No, Route, Driver, Track Button', icon: '🚛' }
  ])
  const [newTransport, setNewTransport] = useState('')

  const addTransport = () => {
    if (newTransport.trim()) {
      setTransports([...transports, { 
        id: Date.now(), 
        name: newTransport.trim(), 
        icon: '🚚' 
      }])
      setNewTransport('')
    }
  }

  const editTransport = (id, newName) => {
    setTransports(transports.map(transport => 
      transport.id === id ? { ...transport, name: newName } : transport
    ))
  }

  const deleteTransport = (id) => {
    setTransports(transports.filter(transport => transport.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Transport Details</h2>
        <div className="flex space-x-2">
          <button
            onClick={addTransport}
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

      {/* Add Transport Input */}
      <div className="mb-6 flex space-x-2">
        <input
          type="text"
          value={newTransport}
          onChange={(e) => setNewTransport(e.target.value)}
          placeholder="Enter transport details..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addTransport()}
        />
        <button
          onClick={addTransport}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Transport
        </button>
      </div>

      {/* Transports List */}
      <div className="space-y-3">
        {transports.map((transport) => (
          <TransportItem
            key={transport.id}
            transport={transport}
            onEdit={editTransport}
            onDelete={deleteTransport}
          />
        ))}
      </div>
    </div>
  )
}

const TransportItem = ({ transport, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(transport.name)

  const handleSave = () => {
    onEdit(transport.id, editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(transport.name)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <span className="text-2xl">{transport.icon}</span>
      
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
          <span className="flex-1 font-medium">{transport.name}</span>
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
              onClick={() => onDelete(transport.id)}
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

export default Transport