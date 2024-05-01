import { Routes, Route } from "react-router-dom";
import CreatePlanSection from "@/sections/CreatePlanPage/CreatePlanSection";

export default function CreatePlan() {
  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <CreatePlanSection />
      </div>
    </div>
  );
}
