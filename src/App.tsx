import {
  JSXElementConstructor,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { lazy } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/reset_and_normalize.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const ChatHome = lazy(() => import("./pages/ChatHome"));
const SingleMessage = lazy(() => import("./pages/SingleMessage"));
const ChatMessage = lazy(() => import("./pages/ChatMessage"));
const AllMessages = lazy(() => import("./pages/Messages"));
const Review = lazy(() => import("./pages/Review"));
import { routes } from "./router";
interface route {
  path: string;
  element: any;
}
function App() {
  const [widgetStatus, setWidgetStatus] = useState(false);

  const getRoutes = (allRoutes: route[]) => {
    allRoutes.map((route) => {
      if (route) {
        return <Route path={route.path} element={route.element} />;
      }
    });
  };

  return (
      <iframe  allowFullScreen>
    <div className="App">
      <>
        {widgetStatus == true && (
            <Routes>
              <Route path="/" element=<ChatHome />></Route>
              <Route path="/" element=<ChatHome />></Route>
              <Route path="/popup" element=<ChatMessage />></Route>
              <Route path="/messages:/id" element=<SingleMessage />></Route>
              <Route path="/messages" element=<AllMessages />></Route>
              <Route path="/review" element=<Review />></Route>
            </Routes>
            )}
        <span id="widget_popup_button"></span>
      </>
    </div>
            </iframe>
  );
}

export default App;
