import { StateCreator, create } from "zustand";
import axios from "axios";
import { useUserStore } from ".";
import { persist } from "zustand/middleware";

type CourseStore = {
  getEnrollments: () => Promise<Record<string, any>>;
  postCourses: (file: FormData) => Promise<any>;
  initializeCourseInfo: () => void;
  inProgressClassList: [];
  completedClassList: [];
  registeredClassList: [];
  gpa: number;
};

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
        const failedEnrollments = res.data.data.failedEnrollments;
        const status = res.status;

        return { status, failedEnrollments }; // Return the status and any failed enrollments
      } catch (error) {
        return { status: 500, failedEnrollments: [] }; // Return status 500 and an empty array
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
