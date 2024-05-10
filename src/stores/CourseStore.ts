import { StateCreator, create } from "zustand";
import axios from "axios";
import { useUserStore } from ".";
import { persist } from "zustand/middleware";

type CourseStore = {
  getEnrollments: () => Promise<Record<string, any>>;
  postCourses: (file: FormData) => Promise<boolean>;
  initializeCourseInfo: () => void;
  inProgressClassList: {
    attributes: string;
    course_id: string;
    credits: string;
    description: string;
    name: string;
    quarter: string;
    year: number;
  }[];
  completedClassList: {
    attributes: string;
    course_id: string;
    credits: string;
    description: string;
    grade: string;
    name: string;
    quarter: string;
    year: number;
  }[];
  registeredClassList: {
    attributes: string;
    course_id: string;
    credits: string;
    description: string;
    name: string;
    quarter: string;
    year: number;
  }[];
  gpa: number;
  dropField: (student_field_id: number) => Promise<boolean>;
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

    dropField: async (student_field_id: number) => {
      try {
        const res = await axios.delete(
          "http://localhost:3000/course/drop-field",
          {
            data: {
              student_field_id,
            },
          }
        );
        // Handle the response from the API
        console.log(res);

        return true; // Return a boolean value indicating success
      } catch (error) {
        // Handle any errors that occurred during the request
        return false; // Return a boolean value indicating failure
      }
    },
  }),
  {
    name: "courseStore",
  }
);

const useCourseStore = create(useCourseStoreTemplate);

export default useCourseStore;
