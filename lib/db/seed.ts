// Run using: npx tsx lib/db/seed.ts
import "dotenv/config";
import { db } from "@/lib/db";

import {
  habit,
  user,
  account,
  userHabit,
  badge,
  userFollower,
  quote,
} from "@/lib/db/schema/schema";

// Utility: insert safely (ignore duplicates)
const safeInsert = async (table: any, values: any[]) => {
  for (const value of values) {
    try {
      await db.insert(table).values(value);
    } catch (err) {
      console.error("Insert error:", err);
    }
  }
};

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

const passwordHash =
  "da822ed6f5351c7ca5a50349e8a9683f:bf6c717f73066f7788d48555c1d19064f444da3898a4c03698e6c1fc56c5c1366e864ec6cfa7f3482b4bf7c21d497324c1edd9dcd5822b3f6a86631cbb871901";

const seed = async () => {
  //
  // USERS
  //
  await safeInsert(user, [
    { id: "u1", name: "admin", email: "admin@example.com" },
    { id: "u2", name: "Alice", email: "alice@example.com" },
    { id: "u3", name: "Torrie", email: "torrie@example.com" },
    { id: "u4", name: "Adrea", email: "adrea@example.com" },
    { id: "u5", name: "Cheston", email: "cheston@example.com" },
    { id: "u6", name: "Linnie", email: "linnie@example.com" },
    { id: "u7", name: "Jose", email: "jose@example.com" },
    { id: "u8", name: "Kerrill", email: "kerrill@example.com" },
    { id: "u9", name: "Skippy", email: "skippy@example.com" },
    { id: "u10", name: "Bud", email: "bud@example.com" },
    { id: "u11", name: "Griffin", email: "griffin@example.com" },
    { id: "u12", name: "Eldin", email: "eldin@example.com" },
    { id: "u13", name: "Burr", email: "burr@example.com" },
    { id: "u14", name: "Pammy", email: "pammy@example.com" },
    { id: "u15", name: "Casi", email: "casi@example.com" },
    { id: "u16", name: "Viola", email: "viola@example.com" },
    { id: "u17", name: "Evin", email: "evin@example.com" },
    { id: "u18", name: "Jamal", email: "hamal@example.com" },
    { id: "u19", name: "Rebecka", email: "rebecka@example.com" },
    { id: "u20", name: "Twyla", email: "twyla@example.com" },
  ]);

  //
  // FOLLOWS
  //
  await safeInsert(userFollower, [
    { followerId: "u1", followingId: "u2" },
    { followerId: "u1", followingId: "u3" },
    { followerId: "u1", followingId: "u4" },

    { followerId: "u2", followingId: "u1" },
    { followerId: "u2", followingId: "u3" },
    { followerId: "u2", followingId: "u5" },

    { followerId: "u3", followingId: "u1" },
    { followerId: "u3", followingId: "u2" },
    { followerId: "u3", followingId: "u5" },

    { followerId: "u4", followingId: "u1" },
    { followerId: "u4", followingId: "u2" },
    { followerId: "u4", followingId: "u3" },

    { followerId: "u5", followingId: "u2" },
    { followerId: "u5", followingId: "u3" },
    { followerId: "u5", followingId: "u4" },

    { followerId: "u6", followingId: "u1" },
    { followerId: "u6", followingId: "u2" },

    { followerId: "u7", followingId: "u3" },
    { followerId: "u7", followingId: "u4" },

    { followerId: "u8", followingId: "u5" },
    { followerId: "u8", followingId: "u6" },

    { followerId: "u9", followingId: "u7" },
    { followerId: "u9", followingId: "u8" },

    { followerId: "u10", followingId: "u9" },
    { followerId: "u10", followingId: "u1" },
  ]);

  //
  // ACCOUNTS (stejné heslo pro všechny)
  //
  await safeInsert(
    account,
    Array.from({ length: 20 }).map((_, i) => {
      const idx = i + 1;
      return {
        id: `acc${idx}`,
        accountId: `acc${idx}`,
        providerId: "credential",
        userId: `u${idx}`,
        password: passwordHash,
      };
    })
  );

  //
  // HABITS
  //
  await safeInsert(habit, [
    { id: "h1", name: "No Smoking" },
    { id: "h2", name: "No Alkohol" },
    { id: "h3", name: "Exercise Daily" },
  ]);

  //
  // BADGES
  //
  await safeInsert(badge, [
    { name: "The First Step", streak: 0, icon: "Footprints" },
    { name: "The Awakening", streak: 1, icon: "Sunrise" },
    { name: "Spark of Hope", streak: 3, icon: "Zap" },
    { name: "Week One Warrior", streak: 7, icon: "Tent" },
    { name: "Double Digits", streak: 10, icon: "Binary" },
    { name: "Fortnight", streak: 14, icon: "Moon" },
    { name: "Brain Rewired", streak: 21, icon: "Brain" },
    { name: "Iron Will", streak: 30, icon: "ShieldCheck" },
    { name: "Half Century", streak: 50, icon: "Award" },
    { name: "Critical Mass", streak: 66, icon: "Anchor" },
    { name: "New Season", streak: 90, icon: "Leaf" },
    { name: "The Centurion", streak: 100, icon: "Swords" },
    { name: "The Climb", streak: 180, icon: "Mountain" },
    { name: "A year!", streak: 365, icon: "Sun" },
    { name: "Rocketman", streak: 500, icon: "Rocket" },
    { name: "Immortal", streak: 1000, icon: "Crown" },
  ]);

  //
  // USER HABITS
  //
  await safeInsert(userHabit, [
    { id: "uh1", habitId: "h1", userId: "u1", daysCompleted: 735, streak: 512, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh2", habitId: "h1", userId: "u2", daysCompleted: 422, streak: 398, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh3", habitId: "h1", userId: "u3", daysCompleted: 99, streak: 45, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh4", habitId: "h1", userId: "u4", daysCompleted: 568, streak: 321, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh5", habitId: "h1", userId: "u5", daysCompleted: 891, streak: 700, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh6", habitId: "h1", userId: "u6", daysCompleted: 231, streak: 120, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh7", habitId: "h1", userId: "u7", daysCompleted: 451, streak: 220, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh8", habitId: "h1", userId: "u8", daysCompleted: 671, streak: 450, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh9", habitId: "h1", userId: "u9", daysCompleted: 390, streak: 200, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh10", habitId: "h1", userId: "u10", daysCompleted: 981, streak: 654, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },

    { id: "uh11", habitId: "h2", userId: "u1", daysCompleted: 124, streak: 46, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh12", habitId: "h2", userId: "u2", daysCompleted: 877, streak: 322, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh13", habitId: "h2", userId: "u3", daysCompleted: 544, streak: 433, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh14", habitId: "h2", userId: "u4", daysCompleted: 655, streak: 323, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh15", habitId: "h2", userId: "u5", daysCompleted: 790, streak: 457, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh16", habitId: "h2", userId: "u6", daysCompleted: 211, streak: 124, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh17", habitId: "h2", userId: "u7", daysCompleted: 679, streak: 346, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh18", habitId: "h2", userId: "u8", daysCompleted: 346, streak: 235, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh19", habitId: "h2", userId: "u9", daysCompleted: 568, streak: 322, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh20", habitId: "h2", userId: "u10", daysCompleted: 433, streak: 211, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },

    { id: "uh21", habitId: "h3", userId: "u1", daysCompleted: 212, streak: 125, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh22", habitId: "h3", userId: "u2", daysCompleted: 656, streak: 324, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh23", habitId: "h3", userId: "u3", daysCompleted: 791, streak: 655, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh24", habitId: "h3", userId: "u4", daysCompleted: 236, streak: 126, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh25", habitId: "h3", userId: "u5", daysCompleted: 878, streak: 544, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh26", habitId: "h3", userId: "u6", daysCompleted: 347, streak: 212, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh27", habitId: "h3", userId: "u7", daysCompleted: 125, streak: 47, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh28", habitId: "h3", userId: "u8", daysCompleted: 434, streak: 213, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh29", habitId: "h3", userId: "u9", daysCompleted: 569, streak: 323, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh30", habitId: "h3", userId: "u10", daysCompleted: 213, streak: 127, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },

    { id: "uh31", habitId: "h1", userId: "u11", daysCompleted: 347, streak: 214, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh32", habitId: "h1", userId: "u12", daysCompleted: 434, streak: 322, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh33", habitId: "h2", userId: "u11", daysCompleted: 126, streak: 48, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh34", habitId: "h2", userId: "u12", daysCompleted: 657, streak: 326, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh35", habitId: "h3", userId: "u11", daysCompleted: 214, streak: 128, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh36", habitId: "h3", userId: "u12", daysCompleted: 348, streak: 215, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh37", habitId: "h1", userId: "u13", daysCompleted: 569, streak: 324, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh38", habitId: "h2", userId: "u13", daysCompleted: 435, streak: 214, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh39", habitId: "h3", userId: "u13", daysCompleted: 215, streak: 129, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
    { id: "uh40", habitId: "h1", userId: "u14", daysCompleted: 792, streak: 457, lastCompleted: yesterday, previousLastCompleted: twoDaysAgo },
  ]);

  
  await safeInsert(quote, [
    {
      text: "Every day is a choice to be stronger than yesterday. You've got this.",
    },
    {
      text: "Success is the sum of small efforts, repeated day in and day out.",
    },
    {
      text: "The only limit to our realization of tomorrow will be our doubts of today.",
    },
    { text: "Don't watch the clock; do what it does. Keep going." },
    { text: "Believe you can and you're halfway there." },
  ]);

  console.log("Seeding complete!");
  return;
};

seed();
