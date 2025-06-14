import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/Table';
import { useCollection } from '@/hooks/useCollection';
import { useAuth } from '@/contexts/AuthContext';
import { Check, X, Pencil } from 'lucide-react';
import EditForm from './EditForm';
import Form from './Form';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileTable from './MobileTable';
import { toast } from 'sonner';

export default function Table() {
	const { data, updateItem, mutation } = useCollection('gol_service-providers');
	const { user } = useAuth();
	const [searchQuery, setSearchQuery] = useState('');

	// Sample data for when no real data exists (matching the UI)
	const sampleProviders = [
		{
			id: 1,
			providerName: 'Swift Container Lines',
			type: 'CFS',
			location: 'Mumbai',
			access: 'Allowed'
		},
		{
			id: 2,
			providerName: 'Fast Ship Ltd',
			type: 'ICD',
			location: 'Ahmedabad',
			access: 'Not Allowed'
		},
		{
			id: 3,
			providerName: 'Ocean Drive Freight',
			type: 'Transport',
			location: 'Delhi',
			access: 'Not Allowed'
		},
		{
			id: 4,
			providerName: 'Zenith Global Packers',
			type: 'CFS',
			location: 'Chennai',
			access: 'Allowed'
		}
	];

	const displayData = data?.length > 0 ? data : sampleProviders;

	const getAccessBadge = (access) => {
		if (access === 'Allowed') {
			return (
				<span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
					<Check size={12} />
					Allowed
				</span>
			);
		} else {
			return (
				<span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
					<X size={12} />
					Not Allowed
				</span>
			);
		}
	};

	const handleAccessToggle = async (providerId, currentAccess) => {
		const newAccess = currentAccess === 'Allowed' ? 'Not Allowed' : 'Allowed';
		try {
			await updateItem(providerId, {
				access: newAccess,
				updatedBy: user?.id,
				updatedAt: new Date().toISOString()
			});
			toast.success(`Provider access ${newAccess.toLowerCase()}`);
		} catch (error) {
			console.log(error);
			toast.error(error.message || 'Failed to update access');
		} finally {
			mutation();
		}
	};

	const columns = [
		{
			id: 'providerName',
			accessorKey: 'providerName',
			header: 'Provider Name',
			filterable: true,
			cell: ({ row }) => (
				<div className="font-medium text-gray-900">
					{row.original.providerName}
				</div>
			)
		},
		{
			id: 'type',
			accessorKey: 'type',
			header: 'Type',
			filterable: true,
			cell: ({ row }) => (
				<div className="text-gray-700">
					{row.original.type}
				</div>
			)
		},
		{
			id: 'location',
			accessorKey: 'location',
			header: 'Location',
			filterable: true,
			cell: ({ row }) => (
				<div className="text-gray-700">
					{row.original.location}
				</div>
			)
		},
		{
			id: 'access',
			accessorKey: 'access',
			header: 'Access',
			filterable: true,
			cell: ({ row }) => getAccessBadge(row.original.access)
		},
		{
			id: 'actions',
			accessorKey: 'actions',
			header: 'Actions',
			filterable: false,
			cell: ({ row }) => (
				<div className='flex gap-3 items-center justify-center'>
					<EditForm info={row.original} />
					<button
						className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
							row.original.access === 'Allowed' 
								? 'bg-red-600 text-white hover:bg-red-700' 
								: 'bg-green-600 text-white hover:bg-green-700'
						}`}
						onClick={() => handleAccessToggle(row.original.id, row.original.access)}
						title={row.original.access === 'Allowed' ? 'Revoke Access' : 'Grant Access'}
					>
						{row.original.access === 'Allowed' ? (
							<>
								<X size={14} />
								Not Allowed
							</>
						) : (
							<>
								<Check size={14} />
								Allow
							</>
						)}
					</button>
				</div>
			),
		}
	];

	// Use mobile table for mobile devices
	if (useIsMobile()) {
		return <MobileTable />;
	}

	return (
		<div className='w-full bg-[var(--accent)] border shadow-md shadow-foreground/40 rounded-lg'>
			<div className="bg-primary text-white px-6 py-4 rounded-t-lg">
				<h2 className="text-lg font-semibold">Service Providers</h2>
			</div>
			
			<div className="p-6">
				{!data?.length && (
					<p className="text-sm text-muted-foreground mb-4 italic">
						Showing sample data — no records found in database.
					</p>
				)}
				
				<DataTable 
					columns={columns} 
					data={displayData}
					searchPlaceholder="Search providers..."
				/>
				
				<div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
					<div className="flex items-center gap-2">
						<span className="text-yellow-600">⚠️</span>
						<p className="text-sm text-yellow-800">
							Any access change will notify the customer and provider.
						</p>
					</div>
				</div>

				<div className="flex justify-end mt-4">
					<button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
						 Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}