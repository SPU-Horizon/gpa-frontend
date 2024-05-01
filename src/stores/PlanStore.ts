import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { useCourseStore } from "."; // TODO: Use for  completed credits, this function is now updated
import { useUserStore } from ".";
import axios from "axios";
import { any } from "zod";
import { generatePlanOptions } from "./generatePlanOptions";

type PlanStore = {
  plans: [];
  maxCredits: number;
  completedCourses: []; // Need to send this to backend. These completed courses are the ones from stevens function
  mandatoryCourses: [];
  getOptions: (
    selected_fields: any[],
    repeated_courses: any[],
    credit_choice: number
  ) => {
    plan_options: any[][];
    mandatory_courses: Set<any>;
    completed_courses: Set<any>;
    completed_credits: any;
  }; // TODO: is it ok that we are returning void
  getSchedule: (options_selected: any[]) => void; // This will be called on that second submit of the input form. It will update the mandatory courses, and send all needed information for stevens scheduler
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
      credit_choice: number
    ) => {
      const completedCourses = useCourseStore.getState().completedClassList;
      const inProgressCourses = useCourseStore.getState().inProgressClassList;
      const fields = useUserStore.getState().fields;

      const planOptions = generatePlanOptions(
        fields,
        selected_fields,
        repeated_courses,
        inProgressCourses,
        completedCourses,
        12
      );

      return planOptions;
    },

    getSchedule: async (options_selected: any[]) => {
      // First step is to update mandatory courses
      const finalCourses = new Set();
      options_selected.forEach((option: any) => {
        finalCourses.add(option.course);
      });

      // Add values in "mandatoryCourses" array to finalCourses
      usePlanStore.getState().mandatoryCourses.forEach((course: any) => {
        finalCourses.add(course);
      });

      set({
        mandatoryCourses: [],
      });

      let formInformation = {
        maxCredits: usePlanStore.getState().maxCredits,
        completedCredits: useCourseStore.getState().completedCredits,
        completedCourses: useCourseStore.getState().completedClassList,
        finalCourses: Array.from(finalCourses),
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
      //ADD STUDENT ID
      //-1 if none found

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

      // set({
      //   plans: res.data,
      // });
    },

    //one function for step 1? --> Kaddija will call this function in her page, so I need to be the one who calls Steven's function

    //Oneo other function for step 2 which calls the function in the backend. Should we reset form information after this step? What else should we reset?

    //One function for saving schedules

    //One function for updating these saved schedules, when should this be called?

    //Initialize values from planStore
  }),
  {
    name: "planStore",
  }
);

const usePlanStore = create(usePlanStoreTemplate);

export default usePlanStore;

/*
const useCourseStoreTemplate: StateCreator<
  CourseStore,
  [],
  [["zustand/persist", CourseStore]]
> = persist(
  (set) => ({
    getEnrollments: async () => {
      // Get the student ID from the user store
      const studentId = useUserStore.getState().studentId;

      const res = await axios
        .get(`http://localhost:3000/course/getCourses?id=${studentId}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return {};
        });

      return res;
    },

    postCourses: async (file) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/course/parseCourses",
          file, // Pass formData directly as the second argument
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle the response from the API
        console.log(res.data);

        return true; // Return a boolean value indicating success
      } catch (error) {
        // Handle any errors that occurred during the request
        return false; // Return a boolean value indicating failure
      }
    },

    // Initialize classLists and gpa
    inProgressClassList: [],
    completedClassList: [],
    registeredClassList: [],
    gpa: 0,

    // Call getEnrollments and set classList
    initializeCourseInfo: async () => {
      const enrollments = await useCourseStore.getState().getEnrollments();

      // Destructure the enrollments object
      const { current, past, future, gpa } = enrollments;

      // Set the values for inProgressClassList, completedClassList, and gpa
      set({
        inProgressClassList: current || [], // Set to an empty array if 'current' is undefined
        completedClassList: past || [], // Set to an empty array if 'past' is undefined
        registeredClassList: future || [], // Set to an empty array if 'future' is undefined
        gpa: gpa || 0, // Set to 0 if 'gpa' is undefined
      });
    },
  }),
  {
    name: "courseStore",
  }
);

const useCourseStore = create(useCourseStoreTemplate);

export default useCourseStore;

*/
