import useAuthStore from "./AuthStore";
import { StateCreator, create } from "zustand";
import { StateStorage, persist } from "zustand/middleware";
import axios from "axios";
//import { del, get, set } from "idb-keyval"; //DO WE WNAT THIS?******************
 
// Define your store's state
type UserState = {
    firstName: string;
    lastName: string;
    studentId: number;
    avatar: string;
    graduationYear: number;
    graduationQuarter: string;

    getUserInfo: () => Promise<Record<string, any>>; //Correct returtn???***********************************************
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
        console.log("Made it inside getUserInfo")

        const res = await axios
            .get(`http://localhost:3000/user/getUserInfo?email=${email}`)
            .then((response) => {
            console.log("Response from getUserInfo:" + response.data); //TESTING CONSOLE.LOG
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

    //Call getUserInfo and set user info
    initializeUserInfo: async () => {
        const userInfo = await useUserStore.getState().getUserInfo();

        //Do we need to get email? If db response changes we must change this as Well
        const { studentId, firstName, lastName, email, avatar, graduationYear, graduationQuarter } = userInfo;

        set({
            studentId: studentId,
            firstName: firstName,
            lastName: lastName,
            avatar: avatar,
            graduationYear: graduationYear,
            graduationQuarter: graduationQuarter,
        
        });
        
    },

  }),


 
  {
    name: "user-storage",
    /*
    getStorage: () => ({
      getItem: get, // async (key) => any
      setItem: set, // async (key, value) => undefined
      removeItem: del,
    }),
    */
  }
);
 
const useUserStore = create(UserStoreTemplate);
 
export default useUserStore;