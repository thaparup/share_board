import { z } from "zod";

export const Role = ["MEMBER", "ADMIN"] as const;

const memberSchema = z.object({
  memberName: z.string().min(1, "Checklist item must have a name"),
  memberEmail: z.string().email(),
  memberAvatarImage: z.string(),
  memberId: z.string(),
  role: z.enum(Role),
});

export const createMemberSchema = z.array(memberSchema);
export type CreateMember = z.infer<typeof createMemberSchema>;
