

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignupFormData } from '../types/auth.types';
import { useMutationUserSignup, } from "./../Api-Client/auth"
import toast from 'react-hot-toast';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})


function RouteComponent() {
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();
  const signupMutation = useMutationUserSignup()




  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (serverData) => {
        toast.success(serverData.message)
        reset()
        nav({ to: '/login' })
      },
      onError: (error: any) => {
        let message = 'Signup failed';

        if (typeof error === 'string') {
          message = error;
        }


        toast.error(message);
      },
    })
  }
  return (
    <div className="mt-12 px-4">
      <h1 className="text-amber-600 text-3xl text-center font-bold mb-6">Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-8 max-w-md mx-auto w-full">

          <label htmlFor="name" className="text-white font-semibold">Name</label>
          <input
            id="name"
            type="text"
            className="ring-amber-600 ring-1 py-2 px-3 rounded outline-none"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <label htmlFor="email" className="text-white font-semibold">Email</label>
          <input
            id="email"
            type="email"
            className="ring-amber-600 ring-1 py-2 px-3 rounded outline-none"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label htmlFor="password" className="text-white font-semibold">Password</label>
          <input
            id="password"
            type="password"
            className="ring-amber-600 ring-1 py-2 px-3 rounded outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <label htmlFor="avatarImage" className="text-white font-semibold">Upload your picture</label>
          <input

            placeholder=''
            type="file"
            accept="image/*"
            className=''

            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  e.target.value = ""; // Clear file input
                  setValue("avatarImageFile", undefined);
                  setError("avatarImageFile", {
                    type: "manual",
                    message: "Only image files are allowed",
                  });
                  return;
                }

                if (file.size > 5 * 1024 * 1024) {
                  e.target.value = ""; // Clear file input
                  setValue("avatarImageFile", undefined);
                  setError("avatarImageFile", {
                    type: "manual",
                    message: "Image must be smaller than 5MB",
                  });
                  return;
                }

                clearErrors("avatarImageFile"); // Clear any previous errors
                setValue("avatarImageFile", file, { shouldValidate: true });
              }
            }}

          />
          {errors.avatarImageFile && (
            <p className="text-red-500 text-sm">{errors.avatarImageFile.message}</p>
          )}


          <Button
            variant="default"
            className="border-amber-600 mt-4 py-6 text-white font-semibold text-md"
            type="submit"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
}
