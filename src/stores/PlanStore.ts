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
  mandatoryCourses: [];
  getOptions: (
    selected_fields: any[],
    repeated_courses: any[],
  ) => {
    plan_options: any[][];
    mandatory_courses: Set<any>;
    completed_courses: Set<any>;
    completed_credits: any;
  }; 
  getSchedule: (options_selected: any[], maxCredits: number) => void; 
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
    mandatoryCourses: [],
    planOptions: [],
    formInformation: {},

    getOptions: (
      selected_fields: any[],
      repeated_courses: any[],
    ) => {
      const completedCourses = useCourseStore.getState().completedClassList;
      const inProgressCourses = useCourseStore.getState().inProgressClassList;
      const completedCredits = useCourseStore.getState().completedCredits;
      const fields = useUserStore.getState().fields;

      const planOptions = generatePlanOptions(
        fields,
        selected_fields,
        repeated_courses,
        inProgressCourses,
        completedCourses,
        completedCredits
      );

      return planOptions;
    },

    getSchedule: async (options_selected: any[], maxCredits: number) => {
      // First step is to update mandatory courses
      const finalCourses = new Set();
      options_selected.forEach((option: any) => {
        finalCourses.add(option.course);
      });


      set({
        mandatoryCourses: [],
      });

      let formInformation = {
        maxCredits: maxCredits,
        completedCredits: useCourseStore.getState().completedCredits,
        completedCourses: useCourseStore.getState().completedClassList,
        options_selected,
      };

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

