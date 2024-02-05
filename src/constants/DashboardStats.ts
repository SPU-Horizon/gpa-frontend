export interface DashboardStat {
    name: string;
    value: number | string;
    icon: string;
}
  
  // Define the stats array
  const DashboardStats: DashboardStat[] = [
    {
      name: "Total Courses",
      value: 10,
      icon: "images/TotalCoursesIcon.png", // Ensure you have the correct path and file extension
    },
    {
      name: "Completed Courses",
      value: 5,
      icon: "images/CompletedCoursesIcon.png",
    },
    {
      name: "Credits In Progress",
      value: 20,
      icon: "images/TotalCoursesIcon.png",
    },
    {
      name: "Credits Earned",
      value: 60,
      icon: "images/CompletedCoursesIcon.png",
    },
    {
      name: "Major",
      value: "Computer Science",
      icon: "images/TotalCoursesIcon.png",
    },
    {
      name: "Credits Until Graduation",
      value: 40,
      icon: "images/CompletedCoursesIcon.png",
    },
    {
      name: "Major Progress",
      value: 75,
      icon: "images/CompletedCoursesIcon.png",
    },
  ];
  
  // Export the stats array as the default export of this module
  export default DashboardStats;
  