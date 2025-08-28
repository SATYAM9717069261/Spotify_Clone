'use client';

import { useState } from 'react';
import { signupUser, SignupData } from '@/lib/api';

interface SignupFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function SignupForm({ onSuccess, onError, className = '' }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [message, setMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof SignupData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      console.log('🚀 Submitting signup form with data:', formData);

      const result = await signupUser(formData);

      console.log('✅ Signup successful:', result);
      setMessage('Account created successfully! Welcome to Spotify Clone!');

      // Reset form
      setFormData({ name: '', email: '', password: '' });

      // Call success callback
      if (onSuccess) {
        onSuccess(result.user);
      }

    } catch (error: any) {
      console.error('❌ Signup error:', error);
      const errorMessage = error.message || 'Signup failed. Please try again.';
      setMessage(errorMessage);

      // Call error callback
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Sign Up for Spotify Clone
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium transition duration-200 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
          } text-white focus:outline-none`}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm ${
          message.includes('successful') || message.includes('Welcome')
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
          Sign in
        </a>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
          <details>
            <summary className="cursor-pointer font-medium">Debug Info</summary>
            <pre className="mt-2 text-xs">
              Form Data: {JSON.stringify(formData, null, 2)}
              Errors: {JSON.stringify(errors, null, 2)}
              Loading: {isLoading.toString()}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
