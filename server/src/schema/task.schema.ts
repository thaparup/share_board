import { z } from "zod";

const PRIORITY_VALUES = ["LOW", "MEDIUM", "HIGH"] as const;
const PROGRESS_VALUES = [
  "IN_PROGRESS",
  "COMPLETED",
  "PENDING",
  "OVERDUE",
] as const;

const checklistItemSchema = z.object({
  name: z.string().min(1, "Checklist item must have a name"),
  checked: z.boolean(),
});

const assignedUserArraySchemaItem = z.object({
  memberId: z.string(),
  memberName: z.string(),
  memberEmail: z.string(),
});
export const assignedUserArraySchema = z
  .array(assignedUserArraySchemaItem)
  .nonempty({ message: "You need to assign the task to atleast one member" });
export const checklistArraySchema = z
  .array(checklistItemSchema)
  .nonempty({ message: "You need to add atleast one todo" });

export const createTaskSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  priority: z.enum(PRIORITY_VALUES),
  dueDate: z.string().datetime(),
  startDate: z.string().datetime(),
  checklist: checklistArraySchema,
  assignedTo: assignedUserArraySchema,
});
