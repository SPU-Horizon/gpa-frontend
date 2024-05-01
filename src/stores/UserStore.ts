import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import useAuthStore from "./AuthStore";

// Define your store's state
type UserState = {
  firstName: string;
  lastName: string;
  studentId: number;
  avatar: string;
  graduationYear: number;
  graduationQuarter: string;
  fieldRequirements: [];
  getUserInfo: () => Promise<Record<string, any>>;
  initializeUserInfo: () => void;
  uploadProfilePicture: (file: FormData) => Promise<void>;
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

    uploadProfilePicture: async (file: FormData) => {
      try {
        await axios.post(
          "http://localhost:3000/user/upload-profile-photo",
          file,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    },

    //Initialie user info
    firstName: "",
    lastName: "",
    studentId: 0,
    avatar: "",
    graduationYear: 0,
    graduationQuarter: "",
    fieldRequirements: [],

    //Call getUserInfo and set user info
    initializeUserInfo: async () => {
      const userInfo = await useUserStore.getState().getUserInfo();

      const {
        student_id,
        first_name,
        last_name,
        avatar,
        graduation_year,
        graduation_quarter,
        field_requirements,
      } = userInfo;

      set({
        studentId: student_id,
        firstName: first_name,
        lastName: last_name,
        avatar: avatar,
        graduationYear: graduation_year,
        graduationQuarter: graduation_quarter,
        fieldRequirements: field_requirements,
      });
    },
  }),

  {
    name: "user-storage",
  }
);

const useUserStore = create(UserStoreTemplate);

export default useUserStore;
