import { Trophy } from "lucide-react";

export const LeaderboardHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold text-gray-700">Global Leaderboard</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Top Performers</h1>
      <p className="text-gray-600">See whos crushing their habits!</p>
    </div>
  );
};
