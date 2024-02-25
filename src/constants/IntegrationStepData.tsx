import { StepProps } from "@/components/dashboard/integration/step";
const WebAppLink = "https://web-apps.spu.edu/apps";
import {
  Search,
  MousePointerClick,
  School,
  CircleDot,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";

export const IntegrationStepData: StepProps[] = [
  {
    title: `1. SPU Online Web App Center`,
    description:
      "Navigate to the SPU Suite of Applications - Where you will find easy access to Banner.",
    icon: <Search height={20} width={20} />,
    link: WebAppLink,
  },
  {
    title: "2. Select Banner",
    description: "Select Banner - If needed enter in your SPU credentials.",
    icon: <MousePointerClick height={20} width={20} />,
  },
  {
    title: "3. Student Menu",
    description:
      "Click on the Student Menu, Followed by Academic Records, and then Click on UG Degree Check.",
    icon: <School height={20} width={20} />,
  },
  {
    title: "4. Course Summary",
    description:
      "Near the Top of the Page, you will notice in the UI a Radio Group, Click on the Circle that's labeled Major/Minor Requirements.",
    icon: <CircleDot height={20} width={25} />,
  },
  {
    title: "5. Right Click on the Page",
    description:
      "Right Click on the Page, then select 'Save Page As' on Safari or 'Save As' on Chrome.",
    icon: <ArrowDownToLine height={20} width={25} />,
  },
  {
    title: "6. That's It!",
    description:
      "Now, simply upload the file here and we'll take care of the rest!",
    icon: <ArrowUpFromLine height={20} width={25} />,
  },
];
