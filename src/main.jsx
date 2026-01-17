import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Home from "./Home.jsx";
import Realisations from "./Realisations.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Nav from "./Nav.jsx";
import Works from "./Works.jsx";
import About from "./About.jsx";
import LoadAnimation from "./LoadAnimation.jsx";
import CreativeTemplate from "./CreativeTemplate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LoadAnimation />
        <Home />
        <CreativeTemplate />
      </>
    ),
  },
  {
    path: "/realisations",
    element: (
      <>
        <Nav />
        <Works />
      </>
    ),
  },
  {
    path: "/a-propos",
    element: (
      <>
        <Nav />
        <About />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
