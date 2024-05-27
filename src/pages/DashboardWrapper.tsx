import { Routes, Route } from "react-router-dom";
import { ClassHistory, IntegrationPage, CreatePlan } from "@/sections";
import Dashboard from "@/sections/dashboard/Dashboard";
import { ProfilePage } from ".";
import RequirementsPage from "./RequirementsPage";

export default function DashboardWrapper() {
  return (
    <div>
      <div className="flex-grow overflow-scroll">
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route
            path="/transcript"
            element={
              <div className="overflow-scroll h-full w-full">
                <ClassHistory />
              </div>
            }
          />
          <Route path="/plans" element={<CreatePlan />} />
          <Route path="/requirements" element={<RequirementsPage />} />
          <Route path="/integrate-banner" element={<IntegrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}
