import { InferSelectModel, relations } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

// Re-export all schemas
export * from "./auth-schema";

export const habit = sqliteTable("habit", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull()
});

export type Habit = InferSelectModel<typeof habit>;

export const userHabit = sqliteTable("habit_user", {
  userHabitId: text("user_habit_id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  habitId: text("habit_id").notNull().references(() => habit.id),
  userId: text("user_id").notNull().references(() => user.id),
  daysCompleted: integer("days_completed").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  lastCompleted: text("last_completed"), // ISO string
  previousLastCompleted: text("previous_last_completed")
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

export const userRelations = relations(user, ({ many }) => ({
  userHabits: many(userHabit),
}));
