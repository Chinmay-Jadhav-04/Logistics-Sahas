import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useCollection } from "@/hooks/useCollection";
import { toast } from "sonner";

export default function AddNewUser() {
  const { addItem, mutation } = useCollection('users');
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    phoneNo: '',
    status: 'Active',
    role: 'Customer',
    access: 'Customer Access',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const formatted = [match[1], match[2], match[3]].filter(Boolean).join('-');
      setFormData((prev) => ({
        ...prev,
        phoneNo: formatted,
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      emailId: '',
      phoneNo: '',
      status: 'Active',
      role: 'Customer',
      access: 'Customer Access',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!formData.name || !formData.emailId || !formData.phoneNo) {
      toast.error('Please fill in all required fields');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailId)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await addItem({
        name: formData.name,
        emailId: formData.emailId,
        phoneNo: formData.phoneNo,
        status: formData.status,
        role: formData.role,
        access: formData.access,
        createdAt: new Date().toISOString(),
      });
      toast.success('User added successfully');
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Failed to add user');
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
        <Button
          title="Add New User"
          icon={<Plus size={18} />}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
        />
      }
      title="Add New User"
      className="bg-[var(--accent)]"
    >
      <div>
        <form className="grid grid-cols-1 gap-4 min-w-[400px]">
          <div className="flex flex-col gap-2">
            <Label title="Name *" />
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="bg-accent"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Email ID *" />
            <Input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="bg-accent"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Phone Number *" />
            <Input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handlePhoneChange}
              placeholder="XXX-XXX-XXXX"
              className="bg-accent"
              maxLength="12"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Status" />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-accent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blacklist">Blacklist</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Role" />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-accent"
            >
              <option value="Customer">Customer</option>
              <option value="CFS Admin">CFS Admin</option>
              <option value="CFS Viewer">CFS Viewer</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label title="Access" />
            <select
              name="access"
              value={formData.access}
              onChange={handleInputChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-accent"
            >
              <option value="Customer Access">Customer Access</option>
              <option value="CFS Access">CFS Access</option>
              <option value="View Access">View Access</option>
              <option value="Full Access">Full Access</option>
            </select>
          </div>
        </form>

        <div className="mt-8 flex gap-4">
          <Button
            title="Submit"
            icon={<UserPlus size={18} />}
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex-1"
          />
          <Button
            title="Cancel"
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded-xl flex-1"
          />
        </div>
      </div>
    </Dialog>
  );
}