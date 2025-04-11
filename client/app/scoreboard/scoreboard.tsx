"use client";
import React from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { Avatar } from "@/app/components/ui/avatar";

import { Crosshair, Heart, Skull, Swords, Target, Trophy } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

// const playerData = [
//   {
//     img: "/images/agents/astra.png",
//     name: "K K",
//     kills: 22,
//     deaths: 17,
//     assists: 10,
//     kd: 1.3,
//     ddPerRound: 47,
//     hsPercentage: "29%",
//     team: "A",
//   },
//   {
//     img: "/images/agents/Breach.png",
//     name: "BrainX",
//     kills: 17,
//     deaths: 23,
//     assists: 12,
//     kd: 0.7,
//     ddPerRound: 9,
//     hsPercentage: "13%",
//     team: "A",
//   },
//   {
//     img: "/images/agents/Brimstone.png",
//     name: "Neel",
//     kills: 20,
//     deaths: 20,
//     assists: 5,
//     kd: 0.7,
//     ddPerRound: -40,
//     hsPercentage: "13%",
//     team: "A",
//   },
//   {
//     img: "/images/agents/Chamber.png",
//     name: "Glaciot214",
//     kills: 15,
//     deaths: 20,
//     assists: 2,
//     kd: 0.8,
//     ddPerRound: -46,
//     hsPercentage: "3%",
//     team: "B",
//   },
function transformPlayerStats(data) {
  // Use Object.entries to convert the object into an array of key-value pairs
  // Then map each pair to our desired format
  return Object.entries(data).map(([playerName, stats]) => {
    // Create a new object that includes the player name and spreads all their stats
    return {
      name: playerName,
      ...(typeof stats === "object" && stats !== null ? stats : {}),
    };
  });
}
// ];

const ScoreBoard = () => {
  let scoreboardLocal = localStorage.getItem("scoreboard");
  if (scoreboardLocal == null) {
    return <div>No data availabe</div>;
  }
  let playerData: any = JSON.parse(scoreboardLocal);

  if (playerData == null) {
    return <div>No data availabe</div>;
  }

  playerData = transformPlayerStats(playerData);

  // console log in for loop

  /**
   * green_Jett
  : 
  {assists: 0, deaths: 0, headshots: 1, kill_death_ratio: 1, kills: 1, …}
green_Neon
: 
{assists: 1, deaths: 1, headshots: 0, kill_death_ratio: 0.5, kills: 1, …}
green_Raze
: 
{assists: 0, deaths: 1, headshots: 1, kill_death_ratio: 2, kills: 4, …}
green_Reyna
: 
{assists: 0, deaths: 2, headshots: 0, kill_death_ratio: 0, kills: 0, …}
green_Yoru
: 
{assists: 0, deaths: 3, headshots: 0, kill_death_ratio: 0, kills: 0, …}
red_Harbor
: 
{assists: 0, deaths: 0, headshots: 0, kill_death_ratio: 1, kills: 1, …}
red_Iso
: 
{assists: 0, deaths: 0, headshots: 0, kill_death_ratio: 1, kills: 1, …}
red_Jett
: 
{assists: 0, deaths: 1, headshots: 0, kill_death_ratio: 0, kills: 0, …}
red_Phoenix
: 
{assists: 0, deaths: 1, headshots: 0, kill_death_ratio: 0, kills: 0, …}
red_Reyna
: 
{assists: 0, deaths: 1, headshots: 0, kill_death_ratio: 0, kills: 0, …}
red_Sage
: 
{assists: 0, deaths: 1, headshots: 1, kill_death_ratio: 1.5, kills: 3, …}
red_Yoru
: 
{assists: 0, deaths: 1, headshots: 0, kill_death_ratio: 0.5, kills: 1, …}
* 
*/
  playerData.map((e) => {
    console.log(e);
  });

  const teamA = playerData.filter(
    (player: any) => player.team_color === "green"
  );
  const teamB = playerData.filter((player: any) => player.team_color === "red");
  console.log(teamA);

  // const teamA = playerData.filter((player: any) => player.team === "A");
  // const teamB = playerData.filter((player: any) => player.team === "B");

  return (
    <>
      <div className="min-h-screen p-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
              Match Statistics
            </h1>
            <p className="text-gray-400 mt-2">Detailed performance metrics</p>
          </div>

          {/* Team A Scoreboard */}
          <Card className="mb-8 overflow-hidden border-t border-[rgba(255,255,255,0.1)] bg-[rgba(17,25,34,0.8)] backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-blue-400">Team A</h2>
              </div>

              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-[rgba(255,255,255,0.1)]">
                    <TableHead className="text-left text-[#6094d0] font-semibold">
                      Agent
                    </TableHead>
                    <TableHead className="text-left text-[#6094d0] font-semibold">
                      Player
                    </TableHead>
                    <TableHead className="text-center text-[#6094d0] font-semibold">
                      <Target className="w-4 h-4 inline mr-1" />
                      Kills
                    </TableHead>
                    <TableHead className="text-center text-[#6094d0] font-semibold">
                      <Skull className="w-4 h-4 inline mr-1" />
                      Deaths
                    </TableHead>
                    <TableHead className="text-center text-[#6094d0] font-semibold">
                      <Heart className="w-4 h-4 inline mr-1" />
                      Assists
                    </TableHead>
                    <TableHead className="text-center text-[#6094d0] font-semibold">
                      <Swords className="w-4 h-4 inline mr-1" />
                      K/D
                    </TableHead>
                    {/* <TableHead className="text-center text-[#6094d0] font-semibold">
                      DMG/Round
                    </TableHead> */}
                    <TableHead className="text-center text-[#6094d0] font-semibold">
                      <Crosshair className="w-4 h-4 inline mr-1" />
                      Headshots
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {teamA.map((player, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      <TableCell>
                        <Avatar className="h-10 w-10 ring-2 ring-blue-500/50">
                          <Image
                            src={`/images/agents/${
                              player.name.split("_")[1]
                            }.png`}
                            // src="/images/agents/Jett.png"
                            alt={`Player ${index + 1}`}
                            width={500}
                            height={500}
                            className="rounded-full hover:scale-110 transition-transform"
                          />
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium text-gray-200">
                        {player.name.split("_")[1]}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-white">
                        {player.kills}
                        {/* {player.headshots} */}
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        {player.deaths}
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        {player.assists}
                      </TableCell>
                      <TableCell
                        className={`text-center font-medium ${
                          player.kill_death_ratio >= 1
                            ? "text-[#1fed33]"
                            : "text-red-500"
                        }`}
                      >
                        {player.kill_death_ratio}
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        {player.assists}
                      </TableCell>
                      {/* <TableCell
                        className={`text-center font-medium ${
                          player.ddPerRound >= 0
                            ? "text-[#1fed33]"
                            : "text-red-500"
                        }`}
                      >
                        {player.ddPerRound >= 0 ? "+" : ""}
                        {player.ddPerRound}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Team B Scoreboard - Similar structure with different colors */}
          <Card className="overflow-hidden border-t border-[rgba(255,255,255,0.1)] bg-[rgba(17,25,34,0.8)] backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-red-400">Team B</h2>
              </div>

              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b border-[rgba(255,255,255,0.1)]">
                    <TableHead className="text-left text-red-400 font-semibold">
                      Agent
                    </TableHead>
                    <TableHead className="text-left text-red-400 font-semibold">
                      Player
                    </TableHead>
                    <TableHead className="text-center text-red-400 font-semibold">
                      <Target className="w-4 h-4 inline mr-1" />
                      Kills
                    </TableHead>
                    <TableHead className="text-center text-red-400 font-semibold">
                      <Skull className="w-4 h-4 inline mr-1" />
                      Deaths
                    </TableHead>
                    <TableHead className="text-center text-red-400 font-semibold">
                      <Heart className="w-4 h-4 inline mr-1" />
                      Assists
                    </TableHead>
                    <TableHead className="text-center text-red-400 font-semibold">
                      <Swords className="w-4 h-4 inline mr-1" />
                      K/D
                    </TableHead>
                    <TableHead className="text-center text-red-400 font-semibold">
                      DMG/Round
                    </TableHead>
                    {/* <TableHead className="text-center text-red-400 font-semibold">
                      <Crosshair className="w-4 h-4 inline mr-1" />
                      Headshots
                    </TableHead> */}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {teamB.map((player, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      <TableCell>
                        <Avatar className="h-10 w-10 ring-2 ring-red-500/50">
                          <Image
                            src={`/images/agents/${
                              player.name.split("_")[1]
                            }.png`}
                            alt={`Player ${index + 1}`}
                            width={500}
                            height={500}
                            className="rounded-full hover:scale-110 transition-transform"
                          />
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium text-gray-200">
                        {player.name.split("_")[1]}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-white">
                        {player.kills}
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        {player.deaths}
                      </TableCell>
                      <TableCell className="text-center text-gray-300">
                        {player.assists}
                      </TableCell>
                      <TableCell
                        className={`text-center font-medium ${
                          player.kd >= 1 ? "text-[#1fed33]" : "text-red-500"
                        }`}
                      >
                        {player.kill_death_ratio}
                      </TableCell>
                      <TableCell className="text-center font-medium text-purple-400">
                        {player.headshots}
                      </TableCell>
                      {/* <TableCell
                        className={`text-center font-medium ${
                          player.ddPerRound >= 0
                            ? "text-[#1fed33]"
                            : "text-red-500"
                        }`}
                      >
                        {player.ddPerRound >= 0 ? "+" : ""}
                        {player.ddPerRound}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ScoreBoard;
