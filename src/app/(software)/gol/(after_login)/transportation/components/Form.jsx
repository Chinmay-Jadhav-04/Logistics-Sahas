import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { Select, SelectItem } from "@/components/ui/Select";
import { useCollection } from "@/hooks/useCollection";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Form() {
  const { user } = useAuth();
  const { createItem, mutation } = useCollection('gol_transportation-services');

  const [formData, setFormData] = useState({
    orderId: '',
    vehicleNo: '',
    driverName: '',
    phoneNumber: '',
    route: '',
    status: 'Pending'
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
      orderId: '',
      vehicleNo: '',
      driverName: '',
      phoneNumber: '',
      route: '',
      status: 'Pending'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate Order ID if not provided
    const orderData = {
      ...formData,
      orderId: formData.orderId || `TRX${Date.now().toString().slice(-3)}`,
      createdBy: user.id
    };

    try {
      console.log('Transportation Service Submitted:', orderData);
      await createItem(orderData);
      toast.success('Created new transportation service');
    } catch (error) {
      console.log(error);
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
        <Button
          title={'CREATE NEW'}
          icon={<Plus className='w-5 h-5' />}
          iconPosition='right'
          className='rounded-md bg-green-600 hover:bg-green-700'
          textSize='text-sm'
        />
      }
      title="Create New Transportation Service"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[60dvw]">
        <div className='flex flex-col gap-2'>
          <Label title={'Order ID'} />
          <Input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            placeholder="e.g., TRX001"
            className='bg-accent'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label title={'Vehicle Number'} />
          <Input
            type="text"
            name="vehicleNo"
            value={formData.vehicleNo}
            onChange={handleChange}
            placeholder="e.g., MH12AB1234"
            className='bg-accent'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label title={'Driver Name'} />
          <Input
            type="text"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            placeholder="Enter driver name"
            className='bg-accent'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label title={'Phone Number'} />
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91-1234567890"
            className='bg-accent'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label title={'Route'} />
          <Input
            type="text"
            name="route"
            value={formData.route}
            onChange={handleChange}
            placeholder="e.g., Mumbai → Delhi"
            className='bg-accent'
          />
        </div>

        <div className='flex flex-col gap-2'>
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
          title={'Create Service'} 
          icon={<Upload />} 
          iconPosition='right' 
          className='rounded-xl bg-green-600 hover:bg-green-700' 
        />
      </div>
    </Dialog>
  );
}