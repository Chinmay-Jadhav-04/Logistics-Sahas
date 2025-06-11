import { useState } from "react";
import { Upload, Plus, Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useCollection } from "@/hooks/useCollection";
import { toast } from "sonner";


export default function EditForm(
	{
		info = {
			 orderId: '',
             vehicleNo: '',
             driverName: '',
             phoneNumber: '',
             route: '',
             status: ''
		}
	}
) {

	const { updateItem, mutation } = useCollection('gol_transportation-services');
	const [formData, setFormData] = useState({
		id: info.id,
		VehicleNo: info.VehicleNo,
		Driver: info.Driver,
		PhoneNo: info.PhoneNo,
		status: info.status,
		actions: info.actions,
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
			VehicleNo: '',
			Driver: '',
			PhoneNo: '',
			status: '',
			actions: '',
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Trackind Details Submitted:', formData);
		try {
			await updateItem(formData.id, {
				VehicleNo: formData.VehicleNo,
				Driver: formData.Driver,
				PhoneNo: formData.PhoneNo,
				status: formData.status,
				actions: formData.actions,
			});
			toast.success('Updated the tracking details');
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		} finally {
			handleReset();
			mutation();
			setIsOpen(false);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
			trigger={
				<Pencil
					size={18}
					className="cursor-pointer text-primary"
				/>
			}
			title="Add New Transport List"
			className='bg-[var(--accent)] cursor-pointer'
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[60dvw]">
				<div className='flex flex-col items-start gap-2'>
					<Label title={'Vehicle Number'} />
					<Input
						type="text"
						name="Vehicle Number"
						value={formData.VehicleNo}
						onChange={handleChange}
						placeholder="Enter Vehicle number"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Driver'} />
					<Input
						type="text"
						name="Driver"
						value={formData.Driver}
						onChange={handleChange}
						placeholder="Enter Driver Name"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col items-start gap-2'>
					<Label title={'Phone Number'} />
					<Input
						type="text"
						name="Phone Number"
						value={formData.PhoneNo}
						onChange={handleChange}
						placeholder="Enter Phone number"
						className='bg-accent'
					/>
				</div>
			</div>

			<div className="mt-6">
				<Button onClick={handleSubmit} title="Upload New Transport Order" icon={<Upload />} iconPosition="right" className="rounded-xl" />
			</div>
		</Dialog>
	)
}
