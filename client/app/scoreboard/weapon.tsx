import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Target, Bomb, Flame } from "lucide-react";

const WeaponStatsTable = () => {
  const weapons = [
    { name: "vandal", kills: 15, damage: 3200, type: "Rifle" },
    { name: "phantom", kills: 12, damage: 2800, type: "Rifle" },
    { name: "operator", kills: 8, damage: 2400, type: "Sniper" },
    { name: "sheriff", kills: 5, damage: 1200, type: "Sidearm" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Weapon Analysis
          </h1>
          <p className="text-gray-400 mt-2">
            Detailed weapon performance metrics
          </p>
        </div>

        <div className="relative p-6 rounded-2xl bg-[rgba(17,25,34,0.8)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-[rgba(255,255,255,0.1)]">
                <TableHead className="text-left text-[#6094d0] font-semibold">
                  <Flame className="w-4 h-4 inline mr-2" />
                  Weapon
                </TableHead>
                <TableHead className="text-center text-[#6094d0] font-semibold">
                  <Target className="w-4 h-4 inline mr-2" />
                  Kills
                </TableHead>
                <TableHead className="text-right text-[#6094d0] font-semibold">
                  <Bomb className="w-4 h-4 inline mr-2" />
                  Damage
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weapons.map((weapon, index) => (
                <TableRow
                  key={index}
                  className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
                >
                  <TableCell className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <img
                        src={`/images/weapons/${weapon.name}.png`}
                        alt={weapon.name}
                        className="object-contain hover:scale-110 transition-transform duration-300 mt-3"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {weapon.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {weapon.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="px-3 py-1 rounded-full bg-[rgba(96,148,208,0.2)] text-[#6094d0]">
                      {weapon.kills}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-[#1fed33]">
                      {weapon.damage.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 flex gap-4 justify-center text-sm text-gray-400">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
              <Target className="w-4 h-4 text-[#6094d0]" /> Total Kills:{" "}
              {weapons.reduce((acc, w) => acc + w.kills, 0)}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
              <Bomb className="w-4 h-4 text-[#6094d0]" /> Total Damage:{" "}
              {weapons.reduce((acc, w) => acc + w.damage, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponStatsTable;
