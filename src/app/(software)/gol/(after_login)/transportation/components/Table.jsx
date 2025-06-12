import { useState } from 'react';
import { DataTable } from '@/components/ui/Table';
import { useCollection } from '@/hooks/useCollection';
import { LucidePenSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/button';
import EditForm from './EditForm';
import Form from './Form';
import DriverDetailsPage from '../../driverdetails/DriverDetailsPage';
import TrackingPage from '../../trackingpage/TrackingPage';
import { sampleServices } from '@/constants/transportation';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileDataTable from '@/components/ui/MobileDataTable';

export default function Table() {
	const { data, deleteItem } = useCollection('gol_transportation-services');
	const [currentView, setCurrentView] = useState('table'); // 'table', 'driver-details', 'tracking'
	const [selectedService, setSelectedService] = useState(null);

	const displayData = data?.length ? data : sampleServices;

	const getStatusBadge = (status) => {
		const statusClasses = {
			'Pending': 'bg-yellow-100 text-yellow-800',
			'On Route': 'bg-blue-100 text-blue-800',
			'Delivered': 'bg-green-100 text-green-800',
			'Cancelled': 'bg-red-100 text-red-800'
		};

		return (
			<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
				{status}
			</span>
		);
	};

	const handleMapPinClick = (service) => {
		setSelectedService(service);
		setCurrentView('driver-details');
	};

	const handleTrackJourney = (driverData) => {
		setCurrentView('tracking');
	};

	const handleBackToTable = () => {
		setCurrentView('table');
		setSelectedService(null);
	};

	const handleBackToDriverDetails = () => {
		setCurrentView('driver-details');
	};

	const columns = [
		{ id: 'orderId', accessorKey: 'orderId', header: 'Order ID', filterable: true, cell: ({ row }) => <div className="font-medium">{row.original.orderId}</div> },
		{ id: 'vehicleNo', accessorKey: 'vehicleNo', header: 'Vehicle No', filterable: true, cell: ({ row }) => <div>{row.original.vehicleNo}</div> },
		{ id: 'driverName', accessorKey: 'driverName', header: 'Driver', filterable: true, cell: ({ row }) => <div>{row.original.driverName}</div> },
		{ id: 'phoneNumber', accessorKey: 'phoneNumber', header: 'Phone Number', filterable: true, cell: ({ row }) => <div>{row.original.phoneNumber}</div> },
		{ id: 'route', accessorKey: 'route', header: 'Route', filterable: true, cell: ({ row }) => <div>{row.original.route}</div> },
		{ id: 'status', accessorKey: 'status', header: 'Status', filterable: true, cell: ({ row }) => getStatusBadge(row.original.status) },
		{
			id: 'actions',
			accessorKey: 'actions',
			header: 'Actions',
			filterable: false,
			cell: ({ row }) => (
				<div className='flex gap-2 items-center justify-center'>
					<EditForm
						size={18}
						info={row.original}
						className="cursor-pointer text-primary"
					/>
					<MapPin
						size={18}
						className="cursor-pointer text-primary hover:text-primary/80"
						onClick={() => handleMapPinClick(row.original)}
					/>
				</div>
			),
		}
	];

	// Render different views based on currentView state
	if (currentView === 'driver-details') {
		return (
			<DriverDetailsPage
				driverId={selectedService?.id}
				driverData={selectedService}
				onBack={handleBackToTable}
				onTrackJourney={handleTrackJourney}
			/>
		);
	}

	if (currentView === 'tracking') {
		return (
			<TrackingPage
				orderData={selectedService}
				onBack={handleBackToDriverDetails}
			/>
		);
	}

	// Default table view
	return (
		<div className='w-full bg-accent border shadow-md shadow-foreground/40 rounded-lg p-6'>
			<div className="flex gap-4 items-center justify-between mb-6">
				<h1 className="text-2xl font-semibold">Transportation Service List</h1>
				<Form />
			</div>

			{!data?.length && (
				<p className="text-sm text-muted-foreground mb-2 italic">
					Showing sample data — no records found in database.
				</p>
			)}
			{
				useIsMobile() ? (
					<MobileDataTable columns={columns} data={displayData} />
				) : (
					<DataTable columns={columns} data={displayData} />
				)
			}

		</div>
	);
}