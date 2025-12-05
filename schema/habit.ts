import { z } from "zod";

export const habitSettingsFormSchema = z.object({
  name: z.string().min(1, "Habit name is required"),
  dailyCost: z.string().optional(),
});

export type HabitSettingsFormSchema = z.infer<typeof habitSettingsFormSchema>;
