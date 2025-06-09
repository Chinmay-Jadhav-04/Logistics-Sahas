import React, { useState, useEffect } from 'react';
import { Search, Filter, User } from 'lucide-react';
import Input from '@/components/ui/Input';
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
      {/* Render appropriate table based on screen size */}
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