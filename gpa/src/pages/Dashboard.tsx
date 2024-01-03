import * as React from "react";

import { ClassHistory } from "@/sections/Transcript/ClassHistory";
import { classes } from "@/constants/CardData";

export default function Dashboard() {
  return (
    <>
      <ClassHistory accounts={[]} Class={classes} />

      {/* <Button onClick={signOut}>Sign Out</Button> */}
    </>
  );
}
