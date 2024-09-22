"use client";
import { login } from '@/services/taskService';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [logUser, setLogUser] = useState({
        email:"",
        password:""
    });

    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogUser((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        try {
            await login(logUser)
      toast.success("Successfully Login");
            router.push('/');
        } catch (error) {
            console.log(error);
            toast.error("Not able to login")
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-light">
            <div className="mb-4">
                <label className="form-label" htmlFor="email">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name='email'
                    required
                    aria-describedby="emailHelp"
                    value={logUser.email}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    value={logUser.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    );
    
};

export default LoginForm;
