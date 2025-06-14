'use client'
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useCollection } from "@/hooks/useCollection";
import Table from "./components/Table";
import Form from "./components/Form";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "./components/MobileTable";
import Input from "@/components/ui/Input";
import { Search, Eye } from "lucide-react";
import Button from "@/components/ui/Button";
import Stats from "./components/stats";

export default function ServiceProviderPage() {
	const { setTitle } = useSidebar();
	const { data, loading } = useCollection('gol_service-providers');
	const isMobile = useIsMobile();

	useEffect(() => {
		setTitle('Service Provider')
	}, [setTitle]);

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

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
					<p className="text-gray-600">Loading service providers...</p>
				</div>
			</div>
		);
	}

	return (
		<section className="space-y-6">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold text-primary">Service Provider</h1>
					<p className="text-light-primary text-sm mt-1">
						Manage service provider access and permissions
					</p>
				</div>
				
				<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
					{/* Search Bar */}
					<div className="relative">
						<Input
							type="text"
							placeholder="Search Customer"
							className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white"
						/>
						<Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
					</div>
					
					{/* View All Providers Button */}
					<Button
						title="View All Providers"
						icon={<Eye size={18} />}
						iconPosition="left"
						className="bg-primary hover:bg-light-primary text-white px-4 py-2 rounded-md whitespace-nowrap"
					/>
				</div>
			</div>

			{/* Stats Section */}
			<Stats providers={displayData} />

			{/* Add New Provider Button - Mobile/Desktop Responsive */}
			<div className="flex justify-end">
				<Form />
			</div>

			{/* Main Table Section */}
			{isMobile ? (
				<MobileTable />
			) : (
				<Table />
			)}

			{/* Footer Info */}
			{!data?.length && (
				<div className="text-center py-4">
					<p className="text-sm text-light-primary">
						This page shows sample data. Connect your database to see real service provider information.
					</p>
				</div>
			)}
		</section>
	);
}