"use client";

import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { type UserFormSchema, userFormSchema } from "@/schema/user";
import { updateUser } from "@/app/(navbar)/(settings)/actions";
import { FormTextField } from "@/components/form-fields/form-text-field";
import { Button } from "@/components/ui/button";

type UserUpdateFormProps = {
  userId: string;
  defaultName: string;
  defaultEmail: string;
};

export const UserUpdateForm = ({
  userId,
  defaultName,
  defaultEmail,
}: UserUpdateFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: defaultName,
      email: defaultEmail,
    },
  });

  const onSubmit = async (data: UserFormSchema) => {
    startTransition(async () => {
      const result = await updateUser(userId, data);

      if (result.success) {
        toast.success("Profile updated successfully");
        form.reset(data);
      } else {
        toast.error(result.error ?? "Failed to update profile");
      }
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormTextField name="name" label="Name" />
          <FormTextField name="email" label="Email" type="email" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {form.formState.isDirty
              ? "You have unsaved changes"
              : "All changes saved"}
          </p>
          <Button disabled={isPending || !form.formState.isDirty} type="submit">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
