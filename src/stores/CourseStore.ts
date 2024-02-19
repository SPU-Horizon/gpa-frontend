import { StateCreator, create } from "zustand";
import axios from "axios";
import useAuthStore from "./AuthStore";
import { persist } from "zustand/middleware";

type CourseStore = {
  getEnrollments: () => Promise<[]>;
  postCourses: (file: FormData) => Promise<boolean>;
  initializeClassList: () => void;
  classList: [];
};

const useCourseStoreTemplate: StateCreator<
  CourseStore,
  [],
  [["zustand/persist", CourseStore]]
> = persist(
  (set) => ({
    getEnrollments: async () => {
      const email = useAuthStore.getState().email;
      console.log(email);

      const res = await axios
        .get(`http://localhost:3000/course/getCourses?email=${email}`)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return [];
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
        return true; // Return a boolean value indicating success
      } catch (error) {
        // Handle any errors that occurred during the request
        return false; // Return a boolean value indicating failure
      }
    },

    // Initialize classList with an empty array
    classList: [],

    // Call getEnrollments and set classList
    initializeClassList: async () => {
      const enrollments = await useCourseStore.getState().getEnrollments();
      set({ classList: enrollments });
    },
  }),
  // Add options object as the second argument
  {
    name: "courseStore", // Specify a name for the persistor
  }
);

const useCourseStore = create(useCourseStoreTemplate);

export default useCourseStore;
