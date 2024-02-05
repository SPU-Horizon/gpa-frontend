import * as React from "react";

import { ClassHistory, IntegrationPage } from "@/sections";
import { classes } from "@/constants";

import { Routes, Route } from "react-router-dom";
import HomeOptions from "@/sections/dashboard/home/HomeOptions";

export default function Dashboard() {
  return (
    <>
      <Routes>
        <Route path="" element={<HomeOptions />} />
        <Route
          path="/transcript"
          element={<ClassHistory accounts={[]} Class={classes} />}
        />
        <Route path="integrate-banner" element={<IntegrationPage />} />
      </Routes>
    </>
  );
}
