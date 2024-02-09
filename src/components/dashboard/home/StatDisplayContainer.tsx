import React from 'react';
import DashboardStats from "@/constants/DashboardStats";
import StatDisplay from "@/components/dashboard/home/StatDisplay";

export default function StatDisplayContainer() {
  return (
    <div className="bg-gray-100 dark:bg-slate-800 rounded-lg shadow-xl max-w-6xl mx-auto flex justify-around items-center space-x-4 p-4 pt-6">
    {DashboardStats.map((stat) => (
        <StatDisplay key={stat.name} label={stat.name} value={stat.value} />
    ))}
    </div>
  );
}