import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import router from "./router/index";
const widgetRouter = router;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense>

    <RouterProvider router={router} />
    </Suspense>
     
  </React.StrictMode>
);
