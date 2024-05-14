import { StepProps } from "@/components/dashboard/integration/step";
const WebAppLink = "https://web-apps.spu.edu/apps";
import {
  Search,
  MousePointerClick,
  School,
  CircleDot,
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronsLeftRight,
} from "lucide-react";

export const IntegrationStepData: StepProps[] = [
  {
    title: `1. SPU Web Apps`,
    description: "Navigate to the SPU suite of Web Applications.",
    icon: <Search height={20} width={20} />,
    link: WebAppLink,
  },
  {
    title: "2. Select Banner",
    description:
      "Select Banner. If prompted to sign in, enter your SPU Microsoft365 credentials.",
    icon: <MousePointerClick height={20} width={20} />,
  },
  {
    title: "3. Student Menu",
    description:
      "Select Student Menu, then Academic Records, and, finally, UG Degree Check.",
    icon: <School height={20} width={20} />,
  },
  {
    title: "4. Major/Minor Requirements",
    description:
      "Select the link starting with 'Admitted' under Major(s) or Minor(s).",
    icon: <CircleDot height={20} width={25} />,
  },
  {
    title: "5. Save the Page",
    description:
      "In your browser, right-click the Page and select 'Save Page As'.",
    icon: <ArrowDownToLine height={20} width={25} />,
  },
  {
    title: "6. Select upload type",
    description:
      "Adding a new field for scheduling or are unsure? Select 'New Field'. If you are only updating your courses then select 'Update Courses'.",
    icon: <ChevronsLeftRight height={20} width={25} />,
  },
  {
    title: "7. That's It!",
    description:
      "Now, simply drop or select the saved file from your file system and upload it here. We'll take care of the rest!",
    icon: <ArrowUpFromLine height={20} width={25} />,
  },
];
