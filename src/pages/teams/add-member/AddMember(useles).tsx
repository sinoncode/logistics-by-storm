import React, {
  useState,
} from "react";

import "./Form.css";

type Role = {
  id: number;
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
  onSubmit: (
    data: FormData & {
      name: string;
    }
  ) => void;

  roles?: Role[];

  isLoading?: boolean;

  onSuccess?: () => void;
};

const AddMember: React.FC<Props> = ({
  onSubmit,
  roles = [],
  isLoading = false,
}) => {

  /* =========================================
     STATES
  ========================================= */

  const [formData, setFormData] =
    useState<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      status: "active",
    });

  const [errors, setErrors] =
    useState<any>({});

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    /* REMOVE ERROR WHEN USER TYPES */

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================================
     VALIDATION
  ========================================= */

  const validateForm = () => {

    const newErrors: any = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    }

    if (!formData.role) {
      newErrors.role =
        "Please select role";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = (
    e: React.FormEvent<
      HTMLFormElement
    >
  ) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,

      name: `${formData.firstName} ${formData.lastName}`,
    });

    /* RESET */

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      status: "active",
    });
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-5"
    >

      {/* NAME */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={
              formData.firstName
            }
            onChange={
              handleChange
            }
            className="input w-full"
            disabled={
              isLoading
            }
          />

          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.firstName
              }
            </p>
          )}
        </div>

        <div>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={
              formData.lastName
            }
            onChange={
              handleChange
            }
            className="input w-full"
            disabled={
              isLoading
            }
          />

          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {
                errors.lastName
              }
            </p>
          )}
        </div>
      </div>

      {/* EMAIL */}

      <div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          className="input w-full"
          disabled={
            isLoading
          }
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* PHONE */}

      <div>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
          className="input w-full"
          disabled={
            isLoading
          }
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* ROLE + STATUS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>

          <select
            name="role"
            value={
              formData.role
            }
            onChange={
              handleChange
            }
            className="input w-full"
            disabled={
              isLoading
            }
          >

            <option value="">
              Select Role
            </option>

            {Array.isArray(
              roles
            ) &&
              roles.map(
                (role) => (
                  <option
                    key={
                      role.id
                    }
                    value={
                      role.name
                    }
                  >
                    {role.name}
                  </option>
                )
              )}
          </select>

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role}
            </p>
          )}
        </div>

        <select
          name="status"
          value={
            formData.status
          }
          onChange={
            handleChange
          }
          className="input w-full"
          disabled={
            isLoading
          }
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        disabled={
          isLoading
        }
        className="button-team w-full disabled:opacity-70"
      >
        {isLoading
          ? "Adding Member..."
          : "Add Member"}
      </button>
    </form>
  );
};

export default AddMember;