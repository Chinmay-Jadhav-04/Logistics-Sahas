  'use client';

  import React, { useState } from 'react';
  import { Calendar, Trash } from 'lucide-react';
  import Input from '@/components/ui/Input';
  import { DataTable } from '@/components/ui/Table';
  import { toast } from 'sonner';
  import { useAuth } from '@/contexts/AuthContext';

  export default function AuditTable() {
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

    const { user } = useAuth();
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    const handleDelete = async (id) => {
      try {
        const confirmation = confirm('Are you sure you want to delete this audit log entry?');
        if (confirmation) {
          toast.success('Audit log entry deleted');
          console.log('Delete audit log entry:', id);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to delete audit log entry');
      }
    };

    const getActionColor = (action) => {
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

    const columns = [
      {
        id: 'serialNumber',
        accessorKey: 'id',
        header: '#',
        filterable: false,
        cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
      },
      {
        id: 'timestamp',
        accessorKey: 'timestamp',
        header: 'Timestamp',
        filterable: true,
        cell: ({ row }) => <div className="text-sm">{row.original.timestamp}</div>,
      },
      {
        id: 'user',
        accessorKey: 'user',
        header: 'User',
        filterable: true,
        cell: ({ row }) => <div className="font-medium">{row.original.user}</div>,
      },
      {
        id: 'role',
        accessorKey: 'role',
        header: 'Role',
        filterable: true,
        cell: ({ row }) => <div className="text-sm">{row.original.role}</div>,
      },
      {
        id: 'action',
        accessorKey: 'action',
        header: 'Action',
        filterable: true,
        cell: ({ row }) => (
          <div className={`${getActionColor(row.original.action)} rounded-lg px-3 py-1 text-center text-sm font-medium`}>
            {row.original.action}
          </div>
        ),
      },
      {
        id: 'module',
        accessorKey: 'module',
        header: 'Module',
        filterable: true,
        cell: ({ row }) => <div className="text-sm">{row.original.module}</div>,
      },
      {
        id: 'details',
        accessorKey: 'details',
        header: 'Details',
        filterable: true,
        cell: ({ row }) => <div className="text-sm font-medium">{row.original.details}</div>,
      },
      {
        id: 'actions',
        accessorKey: 'actions',
        header: 'Delete',
        filterable: false,
        cell: ({ row }) => (
          <div className='flex gap-2 items-center justify-center'>
            <Trash
              size={18}
              className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
              onClick={() => handleDelete(row.original.id)}
            />
          </div>
        ),
      }
    ];

   return (
  <div>
    <div className="border-2 bg-accent p-4 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">Audit Log</h1>
        <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Date Range</span>
            <Input
              type="date"
              className="bg-accent text-sm"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            />
            <span className="text-gray-400">to</span>
            <Input
              type="date"
              className="bg-accent text-sm"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            />
            <button className="bg-[var(--primary)] text-white px-3 py-1 rounded text-sm">
              Filter
            </button>
          </div>
          <div className="flex gap-2">
            <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Export Logs (CSV)
            </button>
            <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
              Download Report (PDF)
            </button>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={staticData}
        searchPlaceholder="Search by User / Action / Module"
      />
    </div>
  </div>
);
}