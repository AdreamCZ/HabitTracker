import { z } from "zod";

export const habitSettingsFormSchema = z.object({
  name: z.string().min(1, "Habit name is required"),
  dailyCost: z.coerce
    .number<number>()
    .positive("Daily cost must be a positive number")
    .nullable(),
});

export type HabitSettingsFormSchema = z.infer<typeof habitSettingsFormSchema>;

export const editUserHabitFormSchema = z.object({
  dailyCost: z.coerce
    .number<number>()
    .positive("Daily cost must be a positive number")
    .nullable(),
});

export type EditUserHabitFormSchema = z.infer<typeof editUserHabitFormSchema>;
