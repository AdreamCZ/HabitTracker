"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { type UserFormSchema, userFormSchema } from "@/schema/user";
import { useUpdateUserMutation } from "@/modules/user/mutations";
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
  const router = useRouter();

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: defaultName,
      email: defaultEmail,
    },
  });

  const onSuccess = async () => {
    router.refresh();
  };

  const { mutate, isPending } = useUpdateUserMutation({ onSuccess });

  const onSubmit = (data: UserFormSchema) => {
    mutate({ id: userId, userFormData: data });
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
