import React, { useState } from "react";
import "./Form.css"
type Role = {
  id: string;
  name: string;
};

type Props = {
  onSubmit: (data: any) => void;
  roles: { id: string; name: string }[];
};

const AddMemberForm: React.FC<Props> = ({ onSubmit, roles }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      status: "Active",
    });
  };

  return (
   <form onSubmit={handleSubmit} className="form-container">
      
      <div className="flex gap-3">
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="input w-full"
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="input w-full"
        required
      />

      {/* Role Dropdown */}
       <div className="flex gap-3">
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="input w-full"
        required
      >
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="input w-full"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
</div>
      <button type="submit" className="button-team w-full">
        Add Member
      </button>
    </form>
  );
};

export default AddMemberForm;