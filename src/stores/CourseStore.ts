import { StateCreator, create } from "zustand";
import axios from "axios";
import useAuthStore from "./AuthStore";
import { persist } from "zustand/middleware";

type CourseStore = {
  getEnrollments: () => Promise<Record<string, any>>;
  postCourses: (file: FormData) => Promise<boolean>;
  initializeCourseInfo: () => void;
  inProgressClassList: [];
  completedClassList: [];
  gpa: number;
};

const useCourseStoreTemplate: StateCreator<
  CourseStore,
  [],
  [["zustand/persist", CourseStore]]
> = persist(
  (set) => ({
    getEnrollments: async () => {
      const email = useAuthStore.getState().email;

      const res = await axios
        .get(`http://localhost:3000/course/getCourses?email=${email}`)
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
    gpa: 0,

    // Call getEnrollments and set classList
    initializeCourseInfo: async () => {
      const enrollments = await useCourseStore.getState().getEnrollments();

      // Destructure the enrollments object
      const { current, past, gpa } = enrollments;

      // Set the values for inProgressClassList, completedClassList, and gpa
      set({
        inProgressClassList: current || [], // Set to an empty array if 'current' is undefined
        completedClassList: past || [], // Set to an empty array if 'past' is undefined
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
