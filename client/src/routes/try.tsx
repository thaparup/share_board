// import { createFileRoute } from '@tanstack/react-router';
// import { useFieldArray, useForm } from 'react-hook-form';
// import type { UseFormRegister, Control } from 'react-hook-form';
// import User from '../components/User';

// export const Route = createFileRoute('/try')({
//   component: RouteComponent,
// });

// let counter = 0; // Simple counter for within the same millisecond

// function generateId() {
//   return `${Date.now()}-${counter++}`;
// }

// function RouteComponent() {
//   type UserType = {
//     id: string;
//     name: string;
//     email: string;
//   };

//   type FormValues = {
//     users: UserType[];
//   };

//   const { control, register, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     defaultValues: {
//       users: [],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'users',
//     keyName: 'id',
//   });

//   const onSubmit = (data: any) => {
//     console.log('Submitted Data:', data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <User
//           fields={fields}
//           register={register}
//           append={append}
//           remove={remove}
//           errors={errors}
//         />
//         {errors.users && <p>{errors.users.message}</p>}
//         <button
//           type="button"
//           onClick={() => append({ id: generateId(), name: '', email: '' })}
//         >
//           Add User
//         </button>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }












import { createFileRoute } from '@tanstack/react-router';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import User from '../components/User';
import { useState } from 'react';

export const Route = createFileRoute('/try')({
  component: RouteComponent,
});

let counter = 0;

function generateId() {
  return `${Date.now()}-${counter++}`;
}

function RouteComponent() {
  type UserType = {
    id: string;
    name: string;
    email: string;
  };

  type FormValues = {
    users: UserType[];
  };

  const methods = useForm<FormValues>({
    defaultValues: {
      users: [],
    },
  });

  const { control, register, handleSubmit, formState: { errors } } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
    keyName: 'id',
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  const handleAppend = () => {
    append({ id: generateId(), name: '', email: '' });
  };
  console.log(new Date())
  const [date, setDate] = useState(new Date())
  console.log('original date', date)
  console.log('iso string', date.toISOString())
  console.log(typeof date)
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <User fields={fields} append={handleAppend} remove={remove} errors={errors} />
          {errors.users && <p>{errors.users.message}</p>}
          <button type="button" onClick={handleAppend}>
            Add User
          </button> */}

          <input
            type="date"
            {...register("startedDate", {
              required: "Start date is required",
              validate: (value) => {
                const today = new Date();
                const selectedDate = new Date(value);
                // Remove time portion to compare only dates
                today.setHours(0, 0, 0, 0);
                selectedDate.setHours(0, 0, 0, 0);
                return selectedDate >= today || "Start date cannot be in the past";
              }
            })}
            className="outline-2 outline-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500  placeholder:italic px-4 py-2 rounded-md"
          />
          {errors.startedDate && (
            <p className="text-red-500 text-sm">
              {errors.startedDate.message}
            </p>
          )}
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}