import * as React from "react";
import { ClassHistory, IntegrationPage, CreatePlan } from "@/sections";
import { Routes, Route } from "react-router-dom";
import HomeOptions from "@/sections/dashboard/HomeOptions";
import { ProfilePage } from ".";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="" element={<HomeOptions />} />
          <Route path="/transcript" element={<ClassHistory />} />
          <Route path="/plans" element={<CreatePlan />} />
          <Route path="/integrate-banner" element={<IntegrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}
