"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { type UserFormSchema, userFormSchema } from "@/schema/user";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema/auth-schema";
import { getSession } from "@/lib/auth/session";

export const getUserById = async (userId: string) => {
  return await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    .from(user)
    .where(eq(user.id, userId))
    .get();
};

export const updateUser = async (userId: string, formData: UserFormSchema) => {
  const session = await getSession();

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (session.user.id !== userId) {
    return {
      success: false,
      error: "Forbidden: You can only update your own profile",
    };
  }

  try {
    const data = userFormSchema.parse(formData);

    await db
      .update(user)
      .set({
        name: data.name,
        email: data.email,
      })
      .where(eq(user.id, userId));

    revalidatePath("/settings");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update user" };
  }
};
