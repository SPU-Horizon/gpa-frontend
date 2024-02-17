import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './AuthStore';
import { get } from 'http';


type CourseStore = {
    getEnrollments: () => Promise<[]>;
    initializeClassList: () => void;
    classList : [];
};





export const useCourseStore = create<CourseStore>((set) => ({
    getEnrollments: async () => {

        const email = useAuthStore.getState().email;
        console.log(email);
       
        const res = await axios.get(`http://localhost:3000/course/getCourses?email=${email}`)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return [];
            })
    

        return res   
    },


  // Initialize classList with an empty array
  classList: [],

  // Call getEnrollments and set classList
  initializeClassList: async () => {
    const enrollments = await useCourseStore.getState().getEnrollments();
    set({ classList: enrollments });
  },

}));