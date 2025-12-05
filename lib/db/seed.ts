// Run using: npx tsx lib/db/seed.ts
import "dotenv/config";
import { db } from "@/lib/db"
import { habit, user, account, userHabit } from "@/lib/db/schema/schema";

async function safeInsert(table: any, values: any) {
	for (const value of values) {
		try {
			await db.insert(table).values([value]);
		} catch (err: any) {
			console.error(err);
		}
	}
}

async function seed() {
	await safeInsert(user, [
		{ id: "u1", name: "Alice", email: "alice@example.com" },
	]);

	await safeInsert(account, [
		{
			id: "a1", accountId: "a1", providerId: "credential", userId: "u1",
			password: "da822ed6f5351c7ca5a50349e8a9683f:bf6c717f73066f7788d48555c1d19064f444da3898a4c03698e6c1fc56c5c1366e864ec6cfa7f3482b4bf7c21d497324c1edd9dcd5822b3f6a86631cbb871901"
			// password: password
		}
	]);

	await safeInsert(habit, [
		{ id: "h1", name: "No Alcohol" },
		{ id: "h2", name: "Exercise Daily" },
	]);

	await safeInsert(userHabit, [
		{ habitId: "h1", userId: "u1", streak: 10, daysCompleted: 10, lastCompleted: "2025-12-02" },
		{ habitId: "h2", userId: "u1", streak: 5, daysCompleted: 5, lastCompleted: "2025-12-01" },
	]);
}

seed();