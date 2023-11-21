import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./core/components/Layout";
import { TravelsPage } from "./modules/travels/TravelsPage";
import { LandingPage } from "./modules/landing/LandingPage";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout></Layout>
  </React.StrictMode>
);
