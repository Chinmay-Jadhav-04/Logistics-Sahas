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
  const { createItem, mutation } = useCollection('gol_service-providers');

  const [formData, setFormData] = useState({
    providerName: '',
    type: '',
    location: '',
    access: 'Not Allowed'
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
      providerName: '',
      type: '',
      location: '',
      access: 'Not Allowed'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const providerData = {
      ...formData,
      createdBy: user.id,
      createdAt: new Date().toISOString()
    };

    try {
      console.log('Service Provider Submitted:', providerData);
      await createItem(providerData);
      toast.success('Created new service provider');
    } catch (error) {
      console.log(error);
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
        <>
          <div className="hidden md:block">
            <Button
              title={'ADD NEW PROVIDER'}
              icon={<Plus className='w-5 h-5' />}
              iconPosition='right'
              className='rounded-md bg-green-600 hover:bg-green-700'
              textSize='text-sm'
            />
          </div>
          <div className="md:hidden">
            <Button
              title={'ADD'}
              icon={<Plus className='w-4 h-4' />}
              iconPosition='right'
              className='rounded-md bg-green-600 hover:bg-green-700 text-xs px-3 py-2'
              textSize='text-xs'
            />
          </div>
        </>
      }
      title="Add New Service Provider"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[60dvw]">
        <div className='flex flex-col gap-2'>
          <Label title={'Provider Name'} />
          <Input
            type="text"
            name="providerName"
            value={formData.providerName}
            onChange={handleChange}
            placeholder="e.g., Swift Container Lines"
            className='bg-accent'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
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

        <div className='flex flex-col gap-2'>
          <Label title={'Location'} />
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Mumbai"
            className='bg-accent'
            required
          />
        </div>

        <div className='flex flex-col gap-2'>
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
          title={'Add Provider'} 
          icon={<Upload />} 
          iconPosition='right' 
          className='rounded-xl bg-light-primary hover:bg-primary' 
        />
      </div>
    </Dialog>
  );
}