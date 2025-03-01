import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import { useNavigate } from "react-router-dom";
interface User {
  id: number;
  username: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate=useNavigate()

  const handle=()=>{
    navigate('/')
  }

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Sort users by score (highest first)
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  // Colors for top ranks
  const getRowClass = (rank: number) => {
    if (rank === 1) return "bg-yellow-400 text-black animate-pulse"; // Gold
    if (rank === 2) return "bg-gray-300 text-black"; // Silver
    if (rank === 3) return "bg-orange-400 text-white"; // Bronze
    return "bg-white text-gray-800"; // Default
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#ff9a9e] via-[#fad0c4] to-[#fad0c4] p-10 relative">
      
      {/* Leaderboard Button at the Top-Left Corner */}
      <button className="absolute top-6 left-6 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:scale-105 transition-all duration-300" onClick={()=>handle()}>
        🔥 Home
      </button>

      {/* Leaderboard Box */}
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/50">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          🏆 Leaderboard
        </h2>

        {/* Table */}
        <table className="w-full border-collapse text-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-black text-white text-xl">
              <th className="p-5">Rank</th>
              <th className="p-5">Name</th>
              <th className="p-5">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`text-center border-b hover:scale-[1.02] transition-transform duration-300 ease-in-out ${getRowClass(index + 1)}`}
              >
                <td className="p-5 font-semibold text-xl">{index + 1}</td>
                <td className="p-5 font-medium">{user.username}</td>
                <td className="p-5 font-bold text-xl">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
