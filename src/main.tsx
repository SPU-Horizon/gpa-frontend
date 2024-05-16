import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <div>
      <App />
    </div>
    <Toaster expand richColors />
  </MantineProvider>
);
