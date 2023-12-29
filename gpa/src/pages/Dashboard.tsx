import * as React from "react";
import { useAuthStore } from "@/stores/AuthStore";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { signOut } = useAuthStore();

  return (
    <>
      <div>a</div>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
