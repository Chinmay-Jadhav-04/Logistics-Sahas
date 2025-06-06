import React, { useEffect, useState } from 'react';
import { Search, Download, Trash, FileText, Calendar } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function MobileAuditList() {
  const { user } = useAuth();
  
  // Static data matching your UI design
  const staticData = [
    {
      id: 1,
      timestamp: '2025-06-04 09:35 AM',
      user: 'Admin01',
      role: 'Super Admin',
      action: 'Deleted',
      module: 'Orders',
      details: '#ORD1034'
    },
    {
      id: 2,
      timestamp: '2025-06-04 09:20 AM',
      user: 'Admin02',
      role: 'Ops Manager',
      action: 'Updated Pricing',
      module: 'CFS Services',
      details: 'CFS A revised'
    },
    {
      id: 3,
      timestamp: '2025-06-04 09:15 AM',
      user: 'Admin01',
      role: 'Super Admin',
      action: 'Approved',
      module: 'Priority Movement',
      details: 'Req #PM1029'
    },
    {
      id: 4,
      timestamp: '2025-06-04 09:00 AM',
      user: 'Admin03',
      role: 'Ops Support',
      action: 'Viewed',
      module: 'Tariff Upload',
      details: 'CFS B'
    },
    {
      id: 5,
      timestamp: '2025-06-03 06:50 PM',
      user: 'Admin02',
      role: 'Ops Manager',
      action: 'Rejected',
      module: 'Special Equipment',
      details: 'Req #SE774'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(staticData);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  useEffect(() => {
    const filtered = staticData.filter(log => {
      const matchesSearch =
        log?.user?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        log?.action?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        log?.module?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        log?.details?.toLowerCase()?.includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
    setFilteredLogs(filtered);
  }, [searchQuery]);

  const getActionBadgeClass = (action) => {
    switch (action.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'updated pricing':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = confirm('Are you sure you want to delete this audit log entry?');
      if (confirmation) {
        console.log('Delete audit log entry:', id);
        toast.success('Audit log entry deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete audit log entry');
    }
  };

  const handleExport = (format) => {
    toast.success(`Exporting audit logs as ${format.toUpperCase()}...`);
    console.log(`Export logs as ${format}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="px-3 py-4 w-full max-w-full">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Log</h2>
          
          {/* Search */}
          <div className="relative w-full mb-4">
            <Input
              type="text"
              placeholder="Search by User / Action / Module"
              className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Date Range Filters */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date Range</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    type="date"
                    className="w-full bg-white border border-gray-300 rounded-lg text-sm"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    placeholder="From date"
                  />
                </div>
                <div className="flex items-center justify-center text-gray-400 text-sm sm:px-2">
                  to
                </div>
                <div className="flex-1">
                  <Input
                    type="date"
                    className="w-full bg-white border border-gray-300 rounded-lg text-sm"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="To date"
                  />
                </div>
              </div>
              
              <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Apply Filter
              </button>
            </div>
          </div>
          
          {/* Export Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <button 
              onClick={() => handleExport('csv')}
              className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => handleExport('pdf')}
              className="flex-1 sm:flex-none bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
            >
              <FileText size={16} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Audit Log Cards */}
        <div className="space-y-3 pb-4">
          {filteredLogs.map((log, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900 text-sm">
                    #{log.id}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getActionBadgeClass(log.action)}`}>
                    {log.action}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="px-4 py-3">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 font-medium min-w-[80px]">Timestamp:</span>
                      <span className="text-gray-900 text-right break-words flex-1 ml-2">{log.timestamp}</span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 font-medium min-w-[80px]">User:</span>
                      <span className="text-gray-900 text-right break-words flex-1 ml-2 font-medium">{log.user}</span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 font-medium min-w-[80px]">Role:</span>
                      <span className="text-gray-900 text-right break-words flex-1 ml-2">{log.role}</span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 font-medium min-w-[80px]">Module:</span>
                      <span className="text-gray-900 text-right break-words flex-1 ml-2">{log.module}</span>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500 font-medium min-w-[80px]">Details:</span>
                      <span className="text-gray-900 text-right break-words flex-1 ml-2 font-medium">{log.details}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 text-sm">No audit logs found</div>
          </div>
        )}
      </div>
    </div>
  );
}