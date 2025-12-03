import { useMutation } from "@tanstack/react-query";

import { type User, type UserFormSchema } from "@/schema/user";

const updateUser = async (
  id: string,
  userFormData: UserFormSchema,
): Promise<User> => {
  const response = await fetch(`/api/user/${id}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userFormData),
  });

  const resultData = await response.json();

  if (!response.ok) {
    throw new Error(resultData.message ?? "Failed to update user");
  }

  return resultData as User;
};

type UseUpdateUserMutationOptions = {
  onSuccess: () => Promise<void>;
};

export const useUpdateUserMutation = ({
  onSuccess,
}: UseUpdateUserMutationOptions) =>
  useMutation({
    mutationFn: ({
      id,
      userFormData,
    }: {
      id: string;
      userFormData: UserFormSchema;
    }) => updateUser(id, userFormData),
    onSuccess: async () => {
      await onSuccess();
    },
  });
