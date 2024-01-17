import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "./components/ui/sonner.tsx";
import { useThemeStore } from "./stores";

const retVal = useThemeStore.getState().theme;
console.log(retVal);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme={retVal === "dark" ? "dark" : "light"}>
    <div>
      <App />
      <Toaster richColors />
    </div>
  </MantineProvider>
);
