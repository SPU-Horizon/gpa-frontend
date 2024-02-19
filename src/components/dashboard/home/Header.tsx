import React from "react";

export default function Header({ username = "Kaddijah Baldeh" }) {
  return (
    <div className="col-span-3 row-start-1">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="text-xl">{username}</div>
      </header>
    </div>
  );
}
