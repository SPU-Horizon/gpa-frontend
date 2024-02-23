import React from "react";

export default function Header({ username = "Kaddijah Baldeh" }) {
  return (
    <header className="bg-white dark:bg-black-base p-[.88rem] flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-xl">Users Name</div>
    </header>
  );
}
