import { DataTable } from '@/components/ui/Table';
import { useCollection } from '@/hooks/useCollection'
import { LucidePenSquare, MapPin } from 'lucide-react'
import Form from './Form';
import EditForm from './EditForm';
import { Button } from '@/components/button';

export default function Table() {
	const { data, deleteItem } = useCollection('gol_transportation-services', {
		expand: 'transportation-services',
	});

	const columns = [
		{
			id: 'id',
			accessorKey: 'id',
			header: 'Order ID',
			filterable: true,
			cell: ({ row }) => <div>{row.original.order}</div>,
		},
		{
			id: 'VehicleNo',
			accessorKey: 'VehicleNo',
			header: 'Vehicle No',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.order?.igmNo}</div>,
		},
		{
			id: 'Driver',
			accessorKey: 'Driver',
			header: 'Driver',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.order?.blNo}</div>,
		},
		{
			id: 'PhoneNo',
			accessorKey: 'PhoneNo',
			header: 'Phone Number',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.order?.boeNo}</div>,
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			filterable: true,
			cell: ({ row }) => <div>{row.original.status}</div>,
		},
		{
			id: 'actions',
			accessorKey: 'actions',
			header: 'Actions',
			filterable: false,
			cell: ({ row }) => (
				<div className='flex gap-2 items-center justify-center'>
					<Button>
					<LucidePenSquare
						size={18}
						className="cursor-pointer text-primary"
					/>
					Update
					</Button>
					<EditForm info={row.original} />
					<Button>
					<MapPin
						size={18}
						className="cursor-pointer text-primary"
					/>
					Track
					</Button>
				</div>
			),
		}
	];


	return (
		<div className='w-full bg-accent border shadow-md shadow-foreground/40 rounded-lg p-6'>
			<div className="flex gap-4 items-center justify-between">
				<h1 className="text-2xl font-semibold">Transportation Service List</h1>
				<Form />
			</div>

			<DataTable columns={columns} data={data} />
		</div>
	)
}

