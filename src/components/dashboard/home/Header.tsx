import React from "react";
import { UserStore } from "@/stores"; 
import { useCourseStore } from "@/stores";

export default function Header() {

  const userStore = UserStore();
  const username = "userStore.username";

  return (
    <header className="bg-white dark:bg-black-base p-[.88rem] flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="text-xl">{username}</div>
    </header>
  );
}
