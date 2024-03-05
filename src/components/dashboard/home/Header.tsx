import React from "react";
import { useUserStore } from "@/stores"; 

export default function Header() {
  const {firstName, lastName}  = useUserStore();

  return (
    <header className="bg-white dark:bg-black-base p-[.88rem] flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-xl">{firstName || 'User'} {lastName || ''}</div>
    </header>
  );
}
