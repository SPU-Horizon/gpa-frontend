import * as React from "react";

import { ClassHistory } from "@/sections";
import { classes } from "@/constants/CardData";

import { Routes, Route } from "react-router-dom";
import HomeOptions from "@/sections/dashboard/home/HomeOptions";

export default function Dashboard() {
  return (
    <>
      <Routes>
        <Route
          path="transcript"
          element={<ClassHistory accounts={[]} Class={classes} />}
        />
        <Route path="" element={<HomeOptions />} />
      </Routes>
    </>
  );
}
