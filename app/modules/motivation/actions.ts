"use server";

import { sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { quote } from "@/lib/db/schema/schema";

export const getRandomQuote = async () => {
  const [randomQuote] = await db
    .select()
    .from(quote)
    .orderBy(sql`RANDOM()`) // SQLite specific random
    .limit(1);

  if (!randomQuote) {
    throw new Error("No quote found in the database.");
  }
  return randomQuote;
};
