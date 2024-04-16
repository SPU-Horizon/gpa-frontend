import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "./AuthStore";

// Define your store's state
type UserState = {
  firstName: string;
  lastName: string;
  studentId: number;
  graduationYear: number;
  graduationQuarter: string;
  enrollmentQuarter: string;
  enrollmentYear: string;
  fieldRequirements: [];
  counselorEmail: string;
  counselorName: string;
  counselorPhone: string;
  counselorId: number;
  counselorTitle: string;
  counselorMeetingLink: string;
  counselorLastnamesServed: string;
  getUserInfo: () => Promise<Record<string, any>>;
  initializeUserInfo: () => void;
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
    fieldRequirements: [],

    //Call getUserInfo and set user info
    initializeUserInfo: async () => {
      const userInfo = await useUserStore.getState().getUserInfo();

      console.log(userInfo);

      const {
        student_id,
        first_name,
        last_name,
        graduation_year,
        graduation_quarter,
        enrollment_quarter,
        enrollment_year,
        field_requirements,
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
        fieldRequirements: field_requirements,
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
