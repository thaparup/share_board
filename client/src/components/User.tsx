import { useFormContext, } from "react-hook-form";
import type { FieldArrayWithId } from "react-hook-form";

type UserType = {
    id: string;
    name: string;
    email: string;
};

type FormValues = {
    users: UserType[];
};

type Props = {
    fields: FieldArrayWithId<FormValues, "users", "id">[];
    append: (user: UserType) => void;
    remove: (index: number) => void;
    errors: any;
};

export default function User({ fields, append, remove, errors }: Props) {
    const { register } = useFormContext<FormValues>();

    return (
        <div>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input
                        {...register(`users.${index}.id`, { required: 'ID is required' })}
                        placeholder="ID"
                        defaultValue={field.id}
                        readOnly
                    />
                    {errors?.users?.[index]?.id && <p>{errors.users[index].id?.message}</p>}

                    <input
                        {...register(`users.${index}.name`, { required: 'Name is required' })}
                        placeholder="Name"
                        defaultValue={field.name}
                    />
                    {errors?.users?.[index]?.name && <p>{errors.users[index].name?.message}</p>}

                    <input
                        {...register(`users.${index}.email`, {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: 'Invalid email format',
                            },
                        })}
                        placeholder="Email"
                        defaultValue={field.email}
                    />
                    {errors?.users?.[index]?.email && <p>{errors.users[index].email?.message}</p>}

                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}