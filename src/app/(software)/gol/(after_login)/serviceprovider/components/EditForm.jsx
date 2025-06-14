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
		providerName: '',
		type: '',
		location: '',
		access: 'Not Allowed'
	}
}) {
	const { updateItem, mutation } = useCollection('gol_service-providers');
	const [formData, setFormData] = useState({
		id: info.id,
		providerName: info.providerName,
		type: info.type,
		location: info.location,
		access: info.access,
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
			providerName: info.providerName,
			type: info.type,
			location: info.location,
			access: info.access,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Service Provider Updated:', formData);
		try {
			await updateItem(formData.id, {
				providerName: formData.providerName,
				type: formData.type,
				location: formData.location,
				access: formData.access,
			});
			toast.success('Updated the service provider');
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		} finally {
			handleReset();
			mutation();
			setIsOpen(false);
		}
	};

	const typeOptions = [
		{ value: 'CFS', label: 'CFS' },
		{ value: 'ICD', label: 'ICD' },
		{ value: 'Transport', label: 'Transport' },
		{ value: 'Warehouse', label: 'Warehouse' },
		{ value: 'Port', label: 'Port' }
	];

	const accessOptions = [
		{ value: 'Allowed', label: 'Allowed' },
		{ value: 'Not Allowed', label: 'Not Allowed' }
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
			title="Edit Service Provider"
			className='bg-[var(--accent)] cursor-pointer'
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[60dvw]">
				<div className='flex flex-col items-start gap-2'>
					<Label title={'Provider Name'} />
					<Input
						type="text"
						name="providerName"
						value={formData.providerName}
						onChange={handleChange}
						placeholder="Enter Provider Name"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Type'} />
					<Select 
						value={formData.type} 
						onValueChange={(value) => setFormData({ ...formData, type: value })} 
						placeholder='Select Type'
					>
						{typeOptions.map(option => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</Select>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Location'} />
					<Input
						type="text"
						name="location"
						value={formData.location}
						onChange={handleChange}
						placeholder="Enter Location"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Access'} />
					<Select 
						value={formData.access} 
						onValueChange={(value) => setFormData({ ...formData, access: value })} 
						placeholder='Select Access'
					>
						{accessOptions.map(option => (
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
					title="Update Service Provider" 
					icon={<Upload />} 
					iconPosition="right" 
					className="rounded-xl bg-blue-600 hover:bg-blue-700" 
				/>
			</div>
		</Dialog>
	)
}