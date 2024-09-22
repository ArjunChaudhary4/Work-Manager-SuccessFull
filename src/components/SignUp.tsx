"use client";
import { addUser } from '@/services/taskService';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface FormState {
  userName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    userName: '',
    email: '',
    password: ''
  });
const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addUser(formState);
      toast.success("Successfully added User");
      router.push('/login');
    } catch (error) {
      console.log(error);
      toast.error("User not added");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Sign Up</h2>
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-6">
          <label htmlFor="userName" className="form-label">Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control shadow-sm"
            value={formState.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control shadow-sm"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control shadow-sm"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 shadow">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
