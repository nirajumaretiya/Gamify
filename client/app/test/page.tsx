import React from "react";

const MatchTable = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Match Details</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Team A Header */}
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
          <span className="text-lg font-bold">Team A • Avg. Rank: Silver II</span>
          <span className="text-sm">Match Rank</span>
        </div>

        {/* Team A Rows */}
        <div className="grid grid-cols-8 gap-2 items-center bg-gray-700 p-4 rounded-lg">
          <span className="text-sm font-medium">K K #5955</span>
          <span className="text-sm">Silver 2</span>
          <span className="text-sm">813</span>
          <span className="text-sm">269</span>
          <span className="text-sm">22</span>
          <span className="text-sm">17</span>
          <span className="text-sm">+5</span>
          <span className="text-sm">1.3</span>
        </div>
        {/* Add other players for Team A similarly */}

        {/* Team B Header */}
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
          <span className="text-lg font-bold">Team B • Avg. Rank: Silver III</span>
          <span className="text-sm">Match Rank</span>
        </div>

        {/* Team B Rows */}
        <div className="grid grid-cols-8 gap-2 items-center bg-gray-700 p-4 rounded-lg">
          <span className="text-sm font-medium">NASTY #SHOT</span>
          <span className="text-sm">Gold 1</span>
          <span className="text-sm">822</span>
          <span className="text-sm">277</span>
          <span className="text-sm">23</span>
          <span className="text-sm">16</span>
          <span className="text-sm">+7</span>
          <span className="text-sm">1.4</span>
        </div>
        {/* Add other players for Team B similarly */}
      </div>
    </div>
  );
};

export default MatchTable;
