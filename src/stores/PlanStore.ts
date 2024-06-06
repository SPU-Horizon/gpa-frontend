//ts-nocheck
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { useCourseStore } from ".";
import { useUserStore } from ".";
import axios from "axios";
import { generatePlanOptions } from "./generatePlanOptions";

type PlanStore = {
  plans: [];
  maxCredits: number;
  completedCourses: []; 
  getOptions: (
    selected_fields: any[],
    repeated_courses: any[],
  ) => {
    plan_options: any[][];
    mandatory_courses: any[];
    completed_courses: any[];
    completed_credits: any;
  }; 
  getSchedule: (max_credits: number, final_courses: any[], updated_completed_courses: any[], updated_completed_credits: number) => void; 
  savePlan: (plan_name: string, plan_json: {}) => void;
  getPlans: () => void;
};

const usePlanStoreTemplate: StateCreator<
  PlanStore,
  [],
  [["zustand/persist", PlanStore]]
> = persist(
  (set) => ({
    plans: [],
    maxCredits: 0,
    completedCourses: [],
    planOptions: [],
    formInformation: {},

    getOptions: (
      selected_fields: any[],
      repeated_courses: any[],
    ) => {
      const completedCourses = useCourseStore.getState().completedClassList;
      const inProgressCourses = useCourseStore.getState().inProgressClassList;
      const completedCredits = useCourseStore.getState().completedCredits;

      const planOptions = generatePlanOptions(
        selected_fields,
        repeated_courses,
        inProgressCourses,
        completedCourses,
        completedCredits
      );

      return planOptions;
    },

    getSchedule: async (max_credits: number, final_courses: any[], updated_completed_courses: any[], updated_completed_credits: number) => {


      let formInformation = {
        max_credits: max_credits,
        final_courses: final_courses,
        completed_courses: updated_completed_courses,
        completed_credits: updated_completed_credits,
      };

      console.log(formInformation);


      // Send all necessary information to steven
      const res = await axios
        .post(`http://localhost:3000/plan/getSchedule`, {
          params: formInformation,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return {};
        });

      return res;
    },

    savePlan: async (plan_name: string, plan_json: {}) => {
      let formInformation = {
        planName: plan_name,
        planJson: plan_json,
      };

      const res = await axios
        .post(`http://localhost:3000/plan/saveSchedule`, {
          params: formInformation,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return {};
        });
    },

    getPlans: async () => {

      const res = await axios
        .get(`http://localhost:3000/plan/getPlans`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return {};
        });

      console.log(res);


    },


  }),
  {
    name: "planStore",
  }
);

const usePlanStore = create(usePlanStoreTemplate);

export default usePlanStore;

