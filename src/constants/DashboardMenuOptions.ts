// Import images at the top of your DashboardStats.ts file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faUpload, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface DashboardOption {
  name: string;
  description: string;
  icon: IconDefinition; // This will store the icon data
  action: () => void;
}
// functions defined for navigating or opening pages
const navigateToCreatePath = () => { /* ... */ };
const navigateToImportTranscript = () => { /* ... */ };
const navigateToSpeakWithAdvisor = () => { /* ... */ };
const navigateToViewProgress = () => { /* ... */ };
//https://images.collegexpress.com/article/How-Create-Your-Own-College-Major-Step-by-Step.jpg

const DashboardMenuOptions: DashboardOption[] = [
  // {
  //   name: "Create A Path",
  //   description: "Plan your academic journey",
  //   // icon: PathIcon,
  //   icon:"https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
  //   action: navigateToCreatePath,
  // },
  {
    name: "Import Transcript",
    description: "Upload your academic records",
    icon: faUpload, // Store the icon data
    action: navigateToImportTranscript,
  },
  {
    name: "Speak with an Advisor",
    description: "Get help and guidance",
    icon: faUser,
    action: navigateToSpeakWithAdvisor,
  },
  {
    name: "View Your Progress",
    description: "See your academic achievements",
    icon: faChartLine,
    action: navigateToViewProgress,
  },
];

export default DashboardMenuOptions;

