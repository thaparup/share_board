import { createFileRoute } from '@tanstack/react-router'
import { updateTask, useFetchTaskById } from '../Api-Client/task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import AssignUser from "../components/AssignUser";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { CreateTaskFormData } from "../types/task.types";
import TaskTodo from "../components/TaskTodo";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Member } from '../types/member.types';
import AssignedUserEdit from '../components/AssignedUserEdit';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export const Route = createFileRoute(
  '/workspaces_/$workspaceId/task/manage/$taskId',
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      taskId: params.taskId,
      workspaceId: params.workspaceId,
    };
  },
})

function RouteComponent() {

  const { taskId, workspaceId } = Route.useLoaderData()
  const { data, refetch } = useFetchTaskById(workspaceId, taskId)
  const [isAssigned, setIsAssigned] = useState(false)
  const methods = useForm<CreateTaskFormData>({
    defaultValues: {
      name: data?.data.task.name,
      description: "",
      checklist: [],
      assignedTo: [],
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,

  } = methods;

  const { fields, append, remove, replace } = useFieldArray({
    name: "checklist",
    control,
    keyName: "id",
    rules: {
      validate: (value) => {
        return value.length > 0 || "At least one checklist item is required";
      },
    },
  });


  const {
    fields: assignedTo,
    append: addUser,
    remove: removeUser,
    replace: replaceAssignedUser
  } = useFieldArray({
    name: "assignedTo",

    control,
    keyName: "id",
    rules: {
      validate: (value) => {
        return value.length > 0 || "At least one assignee is required";
      },
    },
  });
  useEffect(() => {
    if (data?.data) {
      setValue('name', data?.data.task.name)
      setValue('description', data?.data.task.description)
      setValue('priority', data?.data.task.priority)
      setValue('startDate', dayjs(data?.data.task.createdAt).format('YYYY-MM-DD'))
      setValue('dueDate', dayjs(data?.data.task.dueDate).format('YYYY-MM-DD'))
      replace(data?.data.taskTodo);

      replaceAssignedUser(
        data?.data.assignedUser.map((user) => ({
          memberId: user.memberId,
          memberName: user.memberName,
          memberEmail: user.memberEmail,
          memberAvatar: user.memberAvatarImage ?? "",
        }))
      );


    }

  }, [data, setValue])


  const priority = watch("priority")
  const updateTaskMutation = useMutation({
    mutationFn: async ({ formData, workspaceId, taskId }: { formData: CreateTaskFormData; workspaceId: string, taskId: string }) =>
      await updateTask(formData, workspaceId, taskId),
    onSuccess: () => {
      toast.success("Task updated!");
      refetch()
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled(data) {
      if (data) console.log("Task creation response:", data);
    },
  });

  const onSubmit: SubmitHandler<CreateTaskFormData> = (data) => {
    const startedDateUTC = new Date(data.startDate).toISOString();
    const dueDateUTC = new Date(data.dueDate).toISOString();

    const finalData = {
      ...data,
      startDate: startedDateUTC,
      dueDate: dueDateUTC,
    };
    updateTaskMutation.mutate({
      formData: finalData,
      workspaceId: workspaceId,
      taskId: taskId
    });

  };
  const addTodo = () => {
    append({ name: "Default Todo ", checked: false });
  };

  return (
    <div className="py-8 pb-20">
      <button
        onClick={() => window.history.back()}
        className="flex items-center mb-6 ml-4 text-blue-400 hover:text-blue-500 transition-colors"
      >
        <ArrowLeft className="mr-2" />
        Back to Workspace
      </button>

      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-2 max-w-4xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl text-center py-4 font-semibold text-indigo-500">
            Update A Task
          </h1>

          {/* ************************************** Title *************************************  */}
          <label htmlFor="" className="font-semibold">
            Title
          </label>
          <input
            type="text"
            className="outline-2 outline-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:italic px-4 py-2 rounded-md "
            placeholder="title for the task..."
            {...register("name", { required: "Title is required", })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* ************************************** Description *************************************  */}

          <label htmlFor="" className="font-semibold mt-2">
            Description
          </label>
          <textarea
            className="outline-2 outline-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:italic px-4 py-2 rounded-md min-h-[100px]"
            placeholder="describe your task..."
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* *****************************   Select for Priority  ******************************************/}
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="" className='text-md font-medium'>Priority</label>
            <Select
              value={priority}
              onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") =>
                setValue("priority", value, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-[180px] outline-2 outline-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="PRIORITY" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 font-semibold">
                <SelectItem value="LOW">LOW</SelectItem>
                <SelectItem value="HIGH">HIGH</SelectItem>
                <SelectItem value="MEDIUM">MEDIUM</SelectItem>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("priority", { required: "Priority is required" })}
            />

            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* *********************************************** Task Todo ********************************************* */}

          <TaskTodo
            append={addTodo}
            remove={remove}
            errors={errors}
            fields={fields}
            register={register}
          />

          {/* ************************************** Dates *************************************  */}

          <div className="flex justify-between">
            {/* ************************************** Started Dates *************************************  */}

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="block">
                Pick the starting day for the task
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                  // validate: (value) => {
                  //   const today = new Date();
                  //   const selectedDate = new Date(value);
                  //   today.setHours(0, 0, 0, 0);
                  //   selectedDate.setHours(0, 0, 0, 0);
                  //   return (
                  //     selectedDate >= today ||
                  //     "Start date cannot be in the past"
                  //   );
                  // },
                })}
                className="outline-2 outline-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500  placeholder:italic px-4 py-2 rounded-md"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            {/* ************************************** Ending Dates *************************************  */}

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="block">
                Pick the due dates day for the task
              </label>
              <input
                type="date"
                {...register("dueDate", {
                  required: "Due date is required",
                  validate: (value) => {
                    const start = new Date(watch("startDate"));
                    const due = new Date(value);
                    start.setHours(0, 0, 0, 0);
                    due.setHours(0, 0, 0, 0);
                    return (
                      due >= start || "Due date cannot be before start date"
                    );
                  },
                })}
                className="outline-2 outline-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500  placeholder:italic px-4 py-2 rounded-md"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
              )}
            </div>
          </div>

          <AssignedUserEdit
            append={addUser}
            remove={removeUser}
            fields={assignedTo as unknown as Member[]}
            errors={errors}
            workspaceId={workspaceId}
            isAssigned={isAssigned}
            setIsAssigned={setIsAssigned}
          />

          <Button type="submit" className="py-2 my-4">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
