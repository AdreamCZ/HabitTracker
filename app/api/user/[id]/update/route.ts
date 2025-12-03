import { eq } from "drizzle-orm";
import { ZodError } from "zod";

import { type User, userFormSchema } from "@/schema/user";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema/auth-schema";
import { getSession } from "@/lib/auth/session";

export const PUT = async (
  req: Request,
  props: { params: Promise<{ id: string }> },
) => {
  const params = await props.params;

  const { id } = params;

  const session = await getSession();

  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (session.user.id !== id) {
    return Response.json(
      { message: "Forbidden: You can only update your own profile" },
      { status: 403 },
    );
  }

  try {
    const request = await req.json();
    const data = userFormSchema.parse(request);

    await db
      .update(user)
      .set({
        name: data.name,
        email: data.email,
      })
      .where(eq(user.id, id));

    const updatedUser = await db.query.user.findFirst({
      where: eq(user.id, id),
    });

    return Response.json(updatedUser as User);
  } catch (error) {
    console.log(error);

    if (error instanceof ZodError) {
      return Response.json({ errors: error.message }, { status: 400 });
    }

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
