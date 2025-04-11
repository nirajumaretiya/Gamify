import React from "react";

import { Crown, Equal, Star, Trophy } from "lucide-react";
import {
  Table,
  TableCell,
  TableBody,
  TableCaption,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
} from "../components/ui/table";
const Winning = () => {
  const matchResults = {
    teamA: [
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
    ],
    teamB: [
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      true,
    ],
  };

  const teamAWinInd: any[] = [];
  const teamBWinInd: any[] = [];

  for (let i = 0; i < matchResults.teamA.length; i++) {
    if (matchResults.teamA[i] === true) {
      teamAWinInd.push(1);
    } else teamAWinInd.push(0);
  }
  for (let i = 0; i < matchResults.teamB.length; i++) {
    if (matchResults.teamB[i] === true) {
      teamBWinInd.push(1);
    } else teamBWinInd.push(0);
  }

  return (
    <>
      <div className="min-h-screen p-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
              Match History
            </h1>
            <p className="text-gray-400 mt-2">Track your team's performance</p>
          </div>

          <div className="relative p-6 rounded-2xl bg-[rgba(17,25,34,0.8)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            {/* Team Score Summary */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-white">Team A</h2>
                </div>
                <p className="text-3xl font-bold text-blue-400 mt-2">
                  {teamAWinInd.filter((x) => x === 1).length} Wins
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  <h2 className="text-xl font-semibold text-white">Team B</h2>
                </div>
                <p className="text-3xl font-bold text-red-400 mt-2">
                  {teamBWinInd.filter((x) => x === 1).length} Wins
                </p>
              </div>
            </div>

            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <TableHead className="text-left font-bold text-lg text-blue-400">
                    Round
                  </TableHead>
                  {matchResults.teamA.map((_, index) => (
                    <TableHead
                      key={index}
                      className="text-center font-medium text-gray-400"
                    >
                      {index + 1}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <TableCell className="font-semibold text-blue-300">
                    Team A
                  </TableCell>
                  {matchResults.teamA.map((won, index) => (
                    <TableCell key={index} className="text-center">
                      <div className="flex justify-center items-center">
                        {won && teamAWinInd[index] && !teamBWinInd[index] && (
                          <Trophy className="w-6 h-6 text-yellow-500 transform hover:scale-110 transition-transform" />
                        )}
                        {!teamAWinInd[index] && !teamBWinInd[index] && (
                          <Equal className="w-5 h-5 text-gray-400 transform hover:rotate-180 transition-transform" />
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <TableCell className="font-semibold text-red-300">
                    Team B
                  </TableCell>
                  {matchResults.teamB.map((won, index) => (
                    <TableCell key={index} className="text-center">
                      <div className="flex justify-center items-center">
                        {won && (
                          <Trophy className="w-6 h-6 text-red-500 transform hover:scale-110 transition-transform" />
                        )}
                        {!teamAWinInd[index] && !teamBWinInd[index] && (
                          <Equal className="w-5 h-5 text-gray-400 transform hover:rotate-180 transition-transform" />
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-6 flex gap-4 justify-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" /> Win
              </div>
              <div className="flex items-center gap-2">
                <Equal className="w-4 h-4 text-gray-400" /> Draw
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Winning;
