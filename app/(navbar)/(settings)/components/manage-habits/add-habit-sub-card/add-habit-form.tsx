"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  habitSettingsFormSchema,
  type HabitSettingsFormSchema,
} from "@/schema/habit";
import { FormTextField } from "@/components/form-fields/form-text-field";
import { Button } from "@/components/ui/button";
import { FormSelectField } from "@/components/form-fields/form-select-field";
import type { Habit } from "@/lib/db/schema/schema";
import { addNewUserHabit } from "@/app/modules/userHabit/actions";

type AddHabitFormProps = {
  habitsUserDoesNotHave: Habit[];
};

export const AddHabitForm = ({ habitsUserDoesNotHave }: AddHabitFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [formKey, setFormKey] = useState(0);

  const options = habitsUserDoesNotHave.map((habit) => ({
    label: habit.name,
    value: habit.id,
  }));

  const form = useForm<HabitSettingsFormSchema>({
    resolver: zodResolver(habitSettingsFormSchema),
    defaultValues: {
      name: "",
      dailyCost: undefined,
    },
  });

  const onSubmit = async (data: HabitSettingsFormSchema) => {
    startTransition(async () => {
      const result = await addNewUserHabit(data.name, data.dailyCost);

      if (result.success) {
        toast.success("Habit added successfully");
        form.reset();
        setFormKey((prev) => prev + 1);
      } else {
        toast.error(result.error ?? "Failed to add habit");
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        key={formKey}
      >
        <div className="space-y-4">
          <FormSelectField
            name="name"
            placeholder="Habit Name"
            options={options}
          />

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <FormTextField
                name="dailyCost"
                placeholder="Daily Cost ($)"
                type="number"
              />
            </div>
            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
            >
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
