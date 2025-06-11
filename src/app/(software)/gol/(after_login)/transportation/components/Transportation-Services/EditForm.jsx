import { useState } from "react";
import { Upload, Plus, Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Select, SelectItem } from "@/components/ui/Select";
import { useCollection } from "@/hooks/useCollection";
import { toast } from "sonner";

export default function EditForm({
	info = {
		orderId: '',
		vehicleNo: '',
		driverName: '',
		phoneNumber: '',
		route: '',
		status: 'Pending'
	}
}) {
	const { updateItem, mutation } = useCollection('gol_transportation-services');
	const [formData, setFormData] = useState({
		id: info.id,
		orderId: info.orderId,
		vehicleNo: info.vehicleNo,
		driverName: info.driverName,
		phoneNumber: info.phoneNumber,
		route: info.route,
		status: info.status,
	});
	const [isOpen, setIsOpen] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleReset = () => {
		setFormData({
			orderId: info.orderId,
			vehicleNo: info.vehicleNo,
			driverName: info.driverName,
			phoneNumber: info.phoneNumber,
			route: info.route,
			status: info.status,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Transportation Service Updated:', formData);
		try {
			await updateItem(formData.id, {
				orderId: formData.orderId,
				vehicleNo: formData.vehicleNo,
				driverName: formData.driverName,
				phoneNumber: formData.phoneNumber,
				route: formData.route,
				status: formData.status,
			});
			toast.success('Updated the transportation service');
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		} finally {
			handleReset();
			mutation();
			setIsOpen(false);
		}
	};

	const statusOptions = [
		{ value: 'Pending', label: 'Pending' },
		{ value: 'On Route', label: 'On Route' },
		{ value: 'Delivered', label: 'Delivered' },
		{ value: 'Cancelled', label: 'Cancelled' }
	];

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
			trigger={
				<Pencil
					size={18}
					className="cursor-pointer text-primary hover:text-primary/80"
				/>
			}
			title="Edit Transportation Service"
			className='bg-[var(--accent)] cursor-pointer'
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[60dvw]">
				<div className='flex flex-col items-start gap-2'>
					<Label title={'Order ID'} />
					<Input
						type="text"
						name="orderId"
						value={formData.orderId}
						onChange={handleChange}
						placeholder="Enter Order ID"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Vehicle Number'} />
					<Input
						type="text"
						name="vehicleNo"
						value={formData.vehicleNo}
						onChange={handleChange}
						placeholder="Enter Vehicle Number"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Driver Name'} />
					<Input
						type="text"
						name="driverName"
						value={formData.driverName}
						onChange={handleChange}
						placeholder="Enter Driver Name"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Phone Number'} />
					<Input
						type="tel"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
						placeholder="Enter Phone Number"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Route'} />
					<Input
						type="text"
						name="route"
						value={formData.route}
						onChange={handleChange}
						placeholder="Enter Route"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Status'} />
					<Select 
						value={formData.status} 
						onValueChange={(value) => setFormData({ ...formData, status: value })} 
						placeholder='Select Status'
					>
						{statusOptions.map(option => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</Select>
				</div>
			</div>

			<div className="mt-6">
				<Button 
					onClick={handleSubmit} 
					title="Update Transportation Service" 
					icon={<Upload />} 
					iconPosition="right" 
					className="rounded-xl bg-blue-600 hover:bg-blue-700" 
				/>
			</div>
		</Dialog>
	)
}