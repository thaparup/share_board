import React from 'react'
import { FieldError, useForm } from 'react-hook-form';
import { FieldArrayWithId } from 'react-hook-form';
import { CreateTaskFormData } from '../types/task.types';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import { UseFormRegister } from "react-hook-form";


type Todo = {
    name: string,
    checked: boolean
}
type Props = {
    fields: FieldArrayWithId<CreateTaskFormData, "checklist", "id">[];
    append: (todo: Todo) => void;
    remove: (index: number) => void;
    errors?: any
    register: UseFormRegister<CreateTaskFormData>;
};


const TaskTodo = ({ fields, append, remove, errors, register }: Props) => {
    return (
        <>
            <label htmlFor="" className="mt-6 text-xl font-semibold">
                Task Todo
                <label
                    htmlFor=""
                    className="text-sm italic text-gray-400 block -translate-y-[5px]"
                >
                    You can breakdown your task into multiple todo list
                </label>
            </label>

            {fields.length > 0 && (
                <>
                    {fields.map((todo, index) => (
                        <>
                            <div className="flex justify-between pt-8" key={todo.id}>
                                <input
                                    type="text"
                                    className="ring-[1px] ring-white/55 placeholder:italic px-4 py-2 rounded-md w-2/3"
                                    {...register(`checklist.${index}.name`, {
                                        required: "Todo title is required",
                                    })}
                                />

                                <Trash
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => remove(index)}
                                />
                            </div>
                            {errors?.checklist?.[index]?.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.checklist[index].name.message}
                                </p>
                            )}
                        </>
                    ))}
                </>
            )}

            {errors.checklist?.root?.message && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.checklist?.root?.message}
                </p>
            )}

            <Button onClick={() => append({ name: "", checked: false })} type="button" className="my-8 w-fit mx-auto px-8">
                Add Todo
            </Button>

        </>
    )
}

export default TaskTodo