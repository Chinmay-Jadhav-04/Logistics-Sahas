'use client'
import React, { useState } from 'react'

const Customerdetails = () => {
  const [uploadedImages, setUploadedImages] = useState([])

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file)
    }))
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
  }

  return (
    <div className="bg-background border rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Customer Details View Page</h2>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <p className="text-sm text-foreground">Name:</p>
            <p className="font-medium">Shashank Sangawar</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm text-foreground">Email:</p>
            <p className="font-medium">shashank.sangawar@example.com</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm text-foreground">Phone:</p>
            <p className="font-medium">+91 9987361289</p>
          </div>
        </div>

      
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <p className="text-sm text-foreground">Company:</p>
            <p className="font-medium">FlyOver Logistics Ltd.</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm text-foreground">Location:</p>
            <p className="font-medium">Nava Shewa</p>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm text-foreground">ID Proof:</p>
            <p className="font-medium">ML123456789</p>
          </div>
        </div>
      </div>

    
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Uploaded Documents:</h3>
        <div className="flex space-x-4">
          <span className="px-3 py-1 bg-accent text-foreground rounded-lg text-sm">doc1.pdf</span>
          <span className="px-3 py-1 bg-accent text-foreground rounded-lg text-sm">doc2.png</span>
          <span className="px-3 py-1 bg-accent text-foreground rounded-lg text-sm">doc3.jpg</span>
        </div>
      </div>

    
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Gallery Upload:</h3>
          <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2">
            <span>Upload Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square border-2 border-dashed border-foreground rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}

     
          {Array.from({ length: Math.max(0, 6 - uploadedImages.length) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-accent text-accent-foreground"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Customerdetails
