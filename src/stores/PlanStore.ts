import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { useCourseStore } from ".";
import { useUserStore } from ".";
import axios from "axios";
import { generatePlanOptions } from "./generatePlanOptions";
import { Student } from "@/icons";
import { mockSchedules } from "@/constants/MockScheduleData";
import { Schedule } from "./VisualizeStore";

type PlanStore = {
  plans: [];
  mocks: Schedule[];
  maxCredits: number; //TODO: RESET AFTER USE
  completedCourses: []; 
  mandatoryCourses: [];
  selectedFields: any[]; //TODO: RESET AFTER USE
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
  addMock: (mock: Schedule) => void;
};

const usePlanStoreTemplate: StateCreator<
  PlanStore,
  [],
  [["zustand/persist", PlanStore]]
> = persist(
  (set) => ({
    mocks: mockSchedules,
    plans: [],
    maxCredits: 0,
    completedCourses: [],
    mandatoryCourses: [],
    planOptions: [],
    selectedFields: [],
    formInformation: {},

    addMock: (mock: Schedule) => {

      const mocks = usePlanStore.getState().mocks;

      let mocks2 = [mock, ...mocks];

      set({
        mocks: mocks2
      });
    },

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

      set({
        selectedFields: selected_fields
      });

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
        maxCredits: maxCredits,
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
      const ID = useUserStore.getState().studentId;
      const maxCredits = usePlanStore.getState().maxCredits;
      const selectedFields = usePlanStore.getState().selectedFields;


      let formInformation = {
        planName: plan_name,
        planJson: plan_json,
        studentID: ID,
        max: maxCredits,
        selectedFields: selectedFields
      };

      console.log("formInformation ", formInformation)

      const res = await axios
        .post(`http://localhost:3000/plan/savePlan`, {
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
      const studentID = useUserStore.getState().studentId;

      const res = await axios
        .get(`http://localhost:3000/plan/getPlans?id=${studentID}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return {};
        });

      console.log(res);

      set({
        plans: res
      });

    },


  }),
  {
    name: "planStore",
  }
);

const usePlanStore = create(usePlanStoreTemplate);

export default usePlanStore;

