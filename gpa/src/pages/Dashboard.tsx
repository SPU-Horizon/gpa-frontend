import * as React from "react";
import { useAuthStore } from "@/stores/AuthStore";
import { Button } from "@/components/ui/button";
import { DashboardMenu } from "@/sections/dashboard/DashboardMenu";
import { mails } from "@/components/dashboard/CardData";

export default function Dashboard() {
  const { signOut } = useAuthStore();

  return (
    <>
      <DashboardMenu
        accounts={[]}
        mails={mails}
        defaultLayout={undefined}
        // navCollapsedSize={0}
      />

      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
