"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { checkInHabit, type UserHabitWithDetails } from "./actions";
import { Card } from "@/components/ui/card";

interface HabitCardProps {
	userHabit: UserHabitWithDetails;
}

export function HabitCard({ userHabit }: HabitCardProps) {
	const [streak, setStreak] = useState(userHabit.streak);
	const [lastCompleted, setLastCompleted] = useState(userHabit.lastCompleted);
	const [isLoading, setIsLoading] = useState(false);

	const isCheckedInToday = () => {
		if (!lastCompleted) return false;
		const today = new Date();
		const last = new Date(lastCompleted);
		return (
			today.getDate() === last.getDate() &&
			today.getMonth() === last.getMonth() &&
			today.getFullYear() === last.getFullYear()
		);
	};

	const handleCheckIn = async () => {
		if (isCheckedInToday() || isLoading) return;

		setIsLoading(true);
		try {
			console.log("Check in on habit: ", userHabit.id);
			const result = await checkInHabit(userHabit.id);
			if (result.success && result.newStreak !== undefined) {
				setStreak(result.newStreak);
				setLastCompleted(new Date().toISOString());
				toast.success("Checked in!");
			} else {
				toast.error(result.error || "Failed to check in");
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const checkedIn = isCheckedInToday();

	// Generate a color based on the habit name or ID (consistent hashing)
	const colors = [
		"bg-blue-500",
		"bg-red-500",
		"bg-green-500",
		"bg-purple-500",
		"bg-yellow-500",
		"bg-indigo-500",
		"bg-pink-500",
		"bg-teal-500",
	];
	const colorIndex =
		userHabit.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
		colors.length;
	const color = colors[colorIndex];

	return (
		<Card className="p-6">
			<div className="flex items-center justify-between gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-3 mb-2">
						<div className={`w-4 h-4 rounded-full ${color}`} />
						<h3 className="text-xl font-bold text-foreground">{userHabit.name}</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Last logged:{" "}
						{lastCompleted
							? new Date(lastCompleted).toLocaleDateString("cs-CZ")
							: "Never"}
					</p>
				</div>

				<div className="text-center mr-4">
					<p className="text-4xl font-bold text-primary">{streak}</p>
					<p className="text-xs text-muted-foreground font-medium">
						day streak
					</p>
				</div>

				<button
					onClick={handleCheckIn}
					disabled={checkedIn || isLoading}
					className={`flex items-center justify-center w-16 h-16 rounded-full transition-colors shadow-lg hover:shadow-xl ${checkedIn
						? "bg-green-500 text-white cursor-default"
						: "bg-primary text-primary-foreground hover:bg-primary/90"
						} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					<Check className="w-8 h-8" />
				</button>
			</div>

			{/* Streak progress bar */}
			<div className="mt-4 pt-4 border-t border-border">
				<div className="flex justify-between text-xs text-muted-foreground mb-2">
					<span>Progress to milestone</span>
					<span>{(streak % 30)} / 30 days</span>
				</div>
				<div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
					<div
						className="bg-primary h-full rounded-full transition-all"
						style={{ width: `${((streak % 30) / 30) * 100}%` }}
					/>
				</div>
			</div>
		</Card>
	);
}
