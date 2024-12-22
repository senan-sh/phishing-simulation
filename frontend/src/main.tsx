import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./configs/router-config.tsx";
import { UserProvider } from "./context/UserContext/index.tsx";
import "@/styles/globals.scss";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
