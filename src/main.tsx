import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import router from "./router/index";
const widgetRouter = router;
let widgetStatus= false
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense>

    { <RouterProvider router={router} />}
    {/* <div className="widget_popup">
        {!widgetStatus && (
          <div
            onClick={() => widgetStatus=true}
            className="popup_button"
          ></div>
        )}
      </div> */}
    </Suspense>
     
  </React.StrictMode>
);
