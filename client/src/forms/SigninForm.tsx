import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SigninFormData } from '../types/auth.types';
import { Button } from '../components/ui/button';
import { useMutationSignin } from '../Api-Client/auth';
import toast from 'react-hot-toast';
import { redirect, useNavigate, } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth.store';




const SigninForm = () => {
    const nav = useNavigate({ from: '/login' })
    const { login } = useAuthStore()
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<SigninFormData>();



    const signinMutation = useMutationSignin()
    const onSubmit: SubmitHandler<SigninFormData> = async (data) => {
        signinMutation.mutate(data, {
            onSuccess: async (response) => {

                if (response?.data) {
                    await login(response.data); // ✅ Update Zustand state
                    nav({ to: '/dashboard' });        // ✅ Then navigate
                    toast('User logged in successfully', { duration: 3000 });
                }


            },
            onError: (response) => toast.error(response.message)
        })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 mt-9  max-w-md mx-auto '>


            <label htmlFor="email" className="text-white font-semibold">Email</label>
            <input
                id="email"
                type="email"
                className="ring-amber-600 ring-1 py-2 px-3 rounded outline-none"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                    },
                })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <label htmlFor="password" className="text-white font-semibold">Password</label>
            <input
                id="password"
                type="password"
                className="ring-amber-600 ring-1 py-2 px-3 rounded outline-none"
                {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <Button
                variant="default"
                className="border-amber-600 mt-4 py-6 text-white font-semibold text-md"
                type="submit"
                disabled={signinMutation.isPending}
            >
                {signinMutation.isPending ? 'Signing in...' : 'Sign In'}

            </Button>
        </form>
    )
}

export default SigninForm