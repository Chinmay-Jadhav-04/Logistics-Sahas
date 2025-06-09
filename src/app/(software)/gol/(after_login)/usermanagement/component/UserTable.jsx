import { DataTable } from '@/components/ui/Table';
import { Eye, Trash, Edit, User, Settings } from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function UserTable({ activeTab, searchQuery }) {
  const { data, deleteItem, updateItem, mutation } = useCollection('users');
  const { user } = useAuth();
  const router = useRouter();

 
  const filteredData = data?.filter(item => {
    const matchesTab = activeTab === 'CFS' ? 
      (item.role === 'CFS Admin' || item.role === 'CFS Viewer') : 
      (item.role === 'Customer');
    
    const matchesSearch = searchQuery === '' || 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.emailId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneNo?.includes(searchQuery);
    
    return matchesTab && matchesSearch;
  }) || [];

  const handleViewDetails = (userId) => {
    router.push(`/usermanagement/view/${userId}`);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateItem(id, { status });
      toast.success('Status updated successfully');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      mutation();
    }
  };

  const columns = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      filterable: true,
      cell: ({ row }) => <div className="font-medium">{row.original?.name}</div>,
    },
    {
      id: 'emailId',
      accessorKey: 'emailId',
      header: 'Email ID',
      filterable: true,
      cell: ({ row }) => <div className="text-sm">{row.original?.emailId}</div>,
    },
    {
      id: 'phoneNo',
      accessorKey: 'phoneNo',
      header: 'Phone No.',
      filterable: true,
      cell: ({ row }) => <div className="text-sm">{row.original?.phoneNo}</div>,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      filterable: true,
      cell: ({ row }) => {
        const status = row.original.status;
        const getStatusColor = (status) => {
          switch (status) {
            case 'Active':
              return 'bg-green-100 text-green-800';
            case 'Inactive':
              return 'bg-gray-100 text-gray-800';
            case 'Blacklist':
              return 'bg-red-100 text-red-800';
            default:
              return 'bg-gray-100 text-gray-800';
          }
        };
        return (
          <div className={`${getStatusColor(status)} rounded-xl px-3 py-1 text-center text-sm font-medium`}>
            {status}
          </div>
        );
      },
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
      filterable: true,
      cell: ({ row }) => <div className="text-sm">{row.original?.role}</div>,
    },
    {
      id: 'access',
      accessorKey: 'access',
      header: 'Access',
      filterable: true,
      cell: ({ row }) => <div className="text-sm">{row.original?.access}</div>,
    },
    {
      id: 'actions',
      accessorKey: 'actions',
      header: 'Action',
      filterable: false,
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <Eye
            size={18}
            className="cursor-pointer text-primary hover:text-primary/80"
            onClick={() => handleViewDetails(row.original.id)}
            title="View Details"
          />
          <Edit
            size={18}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
            title="Edit User"
          />
          <Settings
            size={18}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            title="Settings"
          />
          <Trash
            size={18}
            className="cursor-pointer text-red-600 hover:text-red-800"
            onClick={async () => {
              const confirmation = confirm('Are you sure you want to delete this user?');
              if (confirmation) {
                try {
                  await deleteItem(row.original.id);
                  toast.success('User deleted successfully');
                } catch (error) {
                  toast.error('Failed to delete user');
                }
              }
            }}
            title="Delete User"
          />
        </div>
      ),
    }
  ];

  return (
    <div>
      <div className="border-2 bg-accent p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">
            {activeTab === 'CFS' ? 'CFS Details' : 'Customer Details'}
          </h1>
          <div className="text-sm text-foreground">
            {filteredData.length} users found
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          searchPlaceholder="Search user by name/email/phone..."
        />
      </div>
    </div>
  );
}