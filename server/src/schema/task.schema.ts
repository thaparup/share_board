import { z } from "zod";

const PRIORITY_VALUES = ["LOW", "MEDIUM", "HIGH"] as const;
const PROGRESS_VALUES = ["IN_PROGRESS", "COMPLETED", "PENDING"] as const;

const checklistItemSchema = z.object({
  name: z.string().min(1, "Checklist item must have a name"),
  checked: z.boolean(),
});

const assignedUserArraySchemaItem = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});
export const assignedUserArraySchema = z
  .array(assignedUserArraySchemaItem)
  .optional();
export const checklistArraySchema = z.array(checklistItemSchema);

export const createTaskSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  priority: z.enum(PRIORITY_VALUES),
  progress: z.enum(PROGRESS_VALUES),
  dueDate: z.coerce.date(),
  checklist: checklistArraySchema,
  assignedTo: assignedUserArraySchema,
});
