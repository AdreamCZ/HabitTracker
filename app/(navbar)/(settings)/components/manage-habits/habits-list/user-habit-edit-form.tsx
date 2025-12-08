"use client";

import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { type UserHabitWithDetails } from "@/app/modules/userHabit/actions";
import { updateUserHabit } from "@/app/modules/userHabit/actions";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { FormTextField } from "@/components/form-fields/form-text-field";
import {
  editUserHabitFormSchema,
  type EditUserHabitFormSchema,
} from "@/schema/habit";

type UserHabitEditFormProps = {
  item: UserHabitWithDetails;
  onCancelAction: () => void;
  onSuccessAction: () => void;
};

export const UserHabitEditForm = ({
  item,
  onCancelAction,
  onSuccessAction,
}: UserHabitEditFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<EditUserHabitFormSchema>({
    resolver: zodResolver(editUserHabitFormSchema),
    defaultValues: {
      dailyCost: item.dailyCost ?? null,
    },
  });

  const onSubmit = async (data: EditUserHabitFormSchema) => {
    startTransition(async () => {
      const result = await updateUserHabit(item.id, data.dailyCost);

      if (result.success) {
        toast.success("Habit updated successfully");
        onSuccessAction();
      } else {
        toast.error(result.error ?? "Failed to update habit");
      }
    });
  };

  const handleCancel = () => {
    form.reset();
    onCancelAction();
  };

  return (
    <CardContent className="pt-0">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <FormTextField
                name="dailyCost"
                placeholder="Daily Cost ($)"
                type="number"
                step="any"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending || !form.formState.isDirty}
              type="submit"
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </CardContent>
  );
};
