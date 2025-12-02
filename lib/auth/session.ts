import { headers } from "next/headers";

import { auth } from "./index";

export const getSession = async () =>
  await auth.api.getSession({
    headers: await headers(),
  });
