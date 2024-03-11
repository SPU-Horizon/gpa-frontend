import * as React from "react";
import { ClassHistory, IntegrationPage, CreatePlan } from "@/sections";
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
          <Route path="/build-schedule" element={<CreatePlan />} />
        </Routes>
      </div>
    </div>
  );
}
