import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getUserHabits } from "./actions";
import { HabitCard } from "./habit-card";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export async function HabitList() {
	const session = await getSession();

	if (!session?.user) {
		redirect("/login");
	}
	const { success, data: habits } = await getUserHabits();

	if (!success || !habits || habits.length === 0) {
		return (
			<Card className="p-8 border-2 border-dashed border-border text-center hover:border-primary/50 cursor-pointer transition-colors">
				<Plus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
				<p className="text-foreground font-semibold mb-1">
					Ready to track a new habit?
				</p>
				<p className="text-sm text-muted-foreground">
					Click the button above to add one!
				</p>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{habits.map((habit) => (
				<HabitCard key={habit.id} habit={habit} />
			))}
		</div>
	);
}
