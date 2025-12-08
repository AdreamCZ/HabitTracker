import { type InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  real,
} from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";

// Re-export all schemas
export * from "./auth-schema";

export const habit = sqliteTable("habit", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
});

export type Habit = InferSelectModel<typeof habit>;

export const userHabit = sqliteTable("habit_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  habitId: text("habit_id")
    .notNull()
    .references(() => habit.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  dailyCost: real("daily_cost"),
  daysCompleted: integer("days_completed").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  lastCompleted: text("last_completed"),
  previousLastCompleted: text("previous_last_completed"),
});
//, (table) => ({
//  pk: index("habit_user_pk").on(table.habitId, table.userId),
//})); // Indexy dělají problém při migracích ...

export type UserHabit = InferSelectModel<typeof userHabit>;

export const userHabitRelations = relations(userHabit, ({ one }) => ({
  habit: one(habit, {
    fields: [userHabit.habitId],
    references: [habit.id],
  }),
  user: one(user, {
    fields: [userHabit.userId],
    references: [user.id],
  }),
}));

export const habitRelations = relations(habit, ({ many }) => ({
  userHabits: many(userHabit),
}));

export const userFollower = sqliteTable(
  "user_follower",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id),
    followingId: text("following_id")
      .notNull()
      .references(() => user.id),
    createdAt: text("created_at")
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followerId, table.followingId] }),
    };
  },
);

export type UserFollower = InferSelectModel<typeof userFollower>;

export const userFollowerRelations = relations(userFollower, ({ one }) => ({
  follower: one(user, {
    fields: [userFollower.followerId],
    references: [user.id],
  }),
  following: one(user, {
    fields: [userFollower.followingId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  userHabits: many(userHabit),
  followers: many(userFollower, { relationName: "followers" }),
  following: many(userFollower, { relationName: "following" }),
}));

export const badge = sqliteTable("badge", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  streak: integer("streak").notNull(),
  icon: text("icon").notNull(),
}); // When adding a new badge the icon has to be added to the icon map in components/misc/badgeIcon.tsx

export type Badge = InferSelectModel<typeof badge>;

export const quote = sqliteTable("quote", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  text: text("text").notNull(),
});

export type Quote = InferSelectModel<typeof quote>;
