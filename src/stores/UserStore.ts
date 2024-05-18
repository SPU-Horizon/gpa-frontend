import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "./AuthStore";

// Define your store's state
export type UserState = {
  firstName: string;
  lastName: string;
  studentId: number;
  graduationYear: number;
  graduationQuarter: string;
  enrollmentQuarter: string;
  enrollmentYear: string;
  fields: {
    student_field_id: number;
    name: string;
    type: string;
    year: number;
    quarter: string;
    requirements: {
      courses: { name: string; credits: number; course_id: string }[];
      section_title: string;
      credits_required: number;
    }[][];
  }[];
  activeField: number;
  counselorEmail: string;
  counselorName: string;
  counselorPhone: string;
  counselorId: number;
  counselorTitle: string;
  counselorMeetingLink: string;
  counselorLastnamesServed: string;
  getUserInfo: () => Promise<Record<string, any>>;
  initializeUserInfo: () => void;
  setActiveField: (activeField: number) => void;
  // For mock testing purposes
};

// Create the Zustand store
const UserStoreTemplate: StateCreator<
  UserState,
  [],
  [["zustand/persist", UserState]]
> = persist(
  (set) => ({
    getUserInfo: async () => {
      const email = useAuthStore.getState().email;

      const res = await axios
        .get(`http://localhost:3000/user/getUserInfo?email=${email}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return {};
        });

      return res;
    },

    setActiveField: (activeField: number) => {
      set({ activeField });
    },

    //Initialize user info
    firstName: "",
    lastName: "",
    studentId: 0,
    graduationYear: 0,
    graduationQuarter: "",
    enrollmentYear: "",
    enrollmentQuarter: "",
    counselorEmail: "",
    counselorName: "",
    counselorPhone: "",
    counselorId: 0,
    counselorTitle: "",
    counselorMeetingLink: "",
    counselorLastnamesServed: "",
    fields: [],
    activeField: 0,

    //Call getUserInfo and set user info
    initializeUserInfo: async () => {
      const userInfo = await useUserStore.getState().getUserInfo();

      const {
        student_id,
        first_name,
        last_name,
        graduation_year,
        graduation_quarter,
        enrollment_quarter,
        enrollment_year,
        fields,
        counselor_email,
        counselor_name,
        counselor_phone,
        counselor_id,
        counselor_title,
        counselor_meeting_link,
        counselor_last_names_served,
      } = userInfo;

      set({
        studentId: student_id,
        firstName: first_name,
        lastName: last_name,
        graduationYear: graduation_year,
        graduationQuarter: graduation_quarter,
        fields: fields,
        enrollmentQuarter: enrollment_quarter,
        enrollmentYear: enrollment_year,
        counselorEmail: counselor_email,
        counselorName: counselor_name,
        counselorPhone: counselor_phone,
        counselorId: counselor_id,
        counselorTitle: counselor_title,
        counselorMeetingLink: counselor_meeting_link,
        counselorLastnamesServed: counselor_last_names_served,
      });
    },
  }),

  {
    name: "user-storage",
  }
);

const useUserStore = create(UserStoreTemplate);

export default useUserStore;
