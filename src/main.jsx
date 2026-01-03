import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./Home.jsx";
import Realisations from "./Realisations.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Nav from "./Nav.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/realisations",
    element: <Nav />,
  },
  {
    path: "/a-propos",
    element: <Nav />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
