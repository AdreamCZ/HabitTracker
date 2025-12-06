// Run using: npx tsx lib/db/seed.ts
import "dotenv/config";
import { db } from "@/lib/db";
import { habit, user, account, userHabit, badge } from "@/lib/db/schema/schema";

const safeInsert = async (table: any, values: any) => {
  for (const value of values) {
    try {
      await db.insert(table).values([value]);
    } catch (err: any) {
      console.error(err);
    }
  }
};

const seed = async () => {
  await safeInsert(user, [
    { id: "u1", name: "Alice", email: "alice@example.com" },
  ]);

  await safeInsert(account, [
    {
      id: "a1",
      accountId: "a1",
      providerId: "credential",
      userId: "u1",
      password:
        "da822ed6f5351c7ca5a50349e8a9683f:bf6c717f73066f7788d48555c1d19064f444da3898a4c03698e6c1fc56c5c1366e864ec6cfa7f3482b4bf7c21d497324c1edd9dcd5822b3f6a86631cbb871901",
      // password: password
    },
  ]);

  await safeInsert(habit, [
    { id: "h1", name: "No Alcohol" },
    { id: "h2", name: "Exercise Daily" },
  ]);

  await safeInsert(userHabit, [
    {
      habitId: "h1",
      userId: "u1",
      streak: 10,
      daysCompleted: 10,
      lastCompleted: "2025-12-02",
    },
    {
      habitId: "h2",
      userId: "u1",
      streak: 5,
      daysCompleted: 5,
      lastCompleted: "2025-12-01",
    },
  ]);

  await safeInsert(badge, [
    {
      name: "The First Step",
      streak: 0,
      icon: "Footprints",
    },
    {
      name: "The Awakening",
      streak: 1,
      icon: "Sunrise",
    },
    {
      name: "Spark of Hope",
      streak: 3,
      icon: "Zap",
    },
    {
      name: "Week One Warrior",
      streak: 7,
      icon: "Tent",
    },
    {
      name: "Double Digits",
      streak: 10,
      icon: "Binary",
    },
    {
      name: "Fortnight",
      streak: 14,
      icon: "Moon",
    },
    {
      name: "Brain Rewired",
      streak: 21,
      icon: "Brain",
    },
    {
      name: "Iron Will",
      streak: 30,
      icon: "ShieldCheck",
    },
    {
      name: "Half Century",
      streak: 50,
      icon: "Award",
    },
    {
      name: "Critical Mass",
      streak: 66,
      icon: "Anchor",
    },
    {
      name: "New Season",
      streak: 90,
      icon: "Leaf",
    },
    {
      name: "The Centurion",
      streak: 100,
      icon: "Swords",
    },
    {
      name: "The Climb",
      streak: 180,
      icon: "Mountain",
    },
    {
      name: "A year!",
      streak: 365,
      icon: "Sun",
    },
    {
      name: "Rocketman",
      streak: 500,
      icon: "Rocket",
    },
    {
      name: "Immortal",
      streak: 1000,
      icon: "Crown",
    },
  ]);

  return;
};

seed();
