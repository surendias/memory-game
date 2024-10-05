import React from "react";
import { Trophy } from "lucide-react";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Trophy className="mr-2 text-yellow-500" />
        Leaderboard
      </h2>
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <span className="font-semibold">{entry.name}</span>
              <span className="text-gray-600">{entry.moves} moves</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No scores yet. Be the first to play!</p>
      )}
    </div>
  );
};

export default Leaderboard;
