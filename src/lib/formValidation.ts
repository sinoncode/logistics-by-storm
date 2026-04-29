export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // First Name validation
  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name validation
  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(data.phone.replace(/\D/g, ''))) {
    errors.phone = 'Phone must be 10-15 digits';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Confirm Password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Role validation
  if (!data.role) {
    errors.role = 'Role is required';
  }

  return errors;
};

export const generateInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const generateAvatarBackground = (initials: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-cyan-500',
  ];
  
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
};

export const createAvatarElement = (firstName: string, lastName: string): string => {
  const initials = generateInitials(firstName, lastName);
  const bgColor = generateAvatarBackground(initials);
  
  // Return an SVG as a data URI that can be used as an avatar
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <rect width="40" height="40" rx="8" class="${bgColor}" fill="currentColor"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="16" font-weight="bold" fill="white">${initials}</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
