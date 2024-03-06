import * as React from "react";
import { ClassHistory, IntegrationPage } from "@/sections";
// import { classes } from "@/constants";
import { Routes, Route } from "react-router-dom";
import HomeOptions from "@/sections/dashboard/home/HomeOptions";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="" element={<HomeOptions />} />
          <Route path="/transcript" element={<ClassHistory />} />
          <Route path="integrate-banner" element={<IntegrationPage />} />
        </Routes>
      </div>
    </div>
  );
}
