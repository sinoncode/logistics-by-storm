import React, { useState } from "react";
import "./Form.css";

type Role = {
  id: string;
  name: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};

type Props = {
  onSubmit: (data: FormData & { name: string }) => void;
  roles: Role[];
};

const AddMember: React.FC<Props> = ({ onSubmit, roles }) => {
  const [formData, setFormData] = useState<FormData>({
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={handleSubmit} className="form-container space-y-4">

      {/* First + Last Name */}
      <div className="flex gap-3">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="input w-full"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="input w-full"
          required
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="input w-full"
        required
      />

      {/* Phone */}
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="input w-full"
        required
      />

      {/* Role + Status */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="button-team w-full"
      >
        Add Member
      </button>

    </form>
  );
};

export default AddMember;