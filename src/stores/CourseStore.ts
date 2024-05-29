import { StateCreator, create } from "zustand";
import axios from "axios";
import { useUserStore } from ".";
import { persist } from "zustand/middleware";

type CourseStore = {
  getEnrollments: () => Promise<Record<string, any>>;
  postBanner: (file: FormData, option: string) => Promise<any>;
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
  completedCredits: number;
  dropField: (student_field_id: number) => Promise<any>;
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

    postBanner: async (file, option) => {
      console.log(option);
      try {
        const res = await axios.post(
          `http://localhost:3000/course/parseBanner?option=${option}`,
          file, // Pass formData directly as the second argument
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle the response from the API
        const failedEnrollments = res.data.data.failedEnrollments;
        const missingFields = res.data.data.missingFields;
        const duplicateFields = res.data.data.duplicateFields;
        const status = res.status;

        return { status, failedEnrollments, missingFields, duplicateFields }; // Return the status and any failed enrollments as well as the object containing this and any similar fields
      } catch (error) {
        // Handle any errors that occurred during the request
        return { status: 500, failedEnrollments: [] };
      }
    },

    // Initialize classLists and gpa
    inProgressClassList: [],
    completedClassList: [],
    registeredClassList: [],
    completedCredits: 0,
    gpa: 0,

    // Call getEnrollments and set classList
    initializeCourseInfo: async () => {
      const enrollments = await useCourseStore.getState().getEnrollments();

      // Destructure the enrollments object
      const { current, past, future, gpa, completed_credits } = enrollments;

      // Set the values for inProgressClassList, completedClassList, and gpa
      set({
        inProgressClassList: current || [], // Set to an empty array if 'current' is undefined
        completedClassList: past || [], // Set to an empty array if 'past' is undefined
        registeredClassList: future || [], // Set to an empty array if 'future' is undefined
        gpa: gpa || 0, // Set to 0 if 'gpa' is undefined
        completedCredits: completed_credits || 0,
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

        return { status: res.status, data: res.data.display_message }; // Return a boolean value indicating success
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
