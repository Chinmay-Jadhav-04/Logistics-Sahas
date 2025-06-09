import React, { useState, useEffect } from 'react';
import { Search, Filter, User } from 'lucide-react';

import UserTable from './UserTable';
import MobileUserTable from './MobileUserTable';
import AddNewUser from './AddNewUser';

const Table = ({ activeTab }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showColumnsFilter, setShowColumnsFilter] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="bg-background border rounded-lg shadow-sm p-6">
     
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        
     
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            {activeTab === 'CFS' ? 'CFS Details View Page' : 'Customer Details View Page'}
          </h2>
          </div>
          
          <div className="flex flex-row justify-end items-center gap-3">
         <AddNewUser />
        </div>
        </div>

  
      {isMobile ? (
        <MobileUserTable 
          activeTab={activeTab} 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange}
        />
      ) : (
        <UserTable 
          activeTab={activeTab} 
          searchQuery={searchQuery}
        />
      )}
    </div>
  );
};

export default Table;