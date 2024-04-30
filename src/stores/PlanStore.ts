import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { useCourseStore } from ".";  // TODO: Use for  completed credits, this function is now updated
import axios from "axios";
 
type PlanStore = {
  plans: [];
  maxCredits: number;
  completedCourses: []; // Need to send this to backend. These completed courses are the ones from stevens function
  mandatoryCourses: [];
  planOptions: []; // **Not needed???** One of the returns from Stevens function. This will be needed for step 2
  getOptions: () => void; // This function will update getOptions. ***Maybe we can just return instead of having a data value planOptions[]**
  updateMandatoryCourses: () => void; // This will be called on that second submit of the input form. It will update the mandatory courses, and send all needed information for stevens scheduler
  savePlan: () => void;
  //Get Plans?
  formInformation: {}; // Will contain everything  sent to backend for stevens function
};
 
const usePlanStoreTemplate: StateCreator<
  PlanStore,
  [],
  [["zustand/persist", PlanStore]]
> = persist(
    (set) => ({


      //one function for step 1? --> Kaddija will call this function in her page, so I need to be the one who calls Steven's function
      

      //Oneo other function for step 2 which calls the function in the backend. Should we reset form information after this step? What else should we reset?



      //One function for saving schedules

      //One function for updating these saved schedules, when should this be called?



      //Initialize values from planStore












    }), {
  name: "planStore",
});
 
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