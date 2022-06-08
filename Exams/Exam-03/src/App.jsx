import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./components/Layout";
import Home from "./modules/admin/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </React.Fragment>
  );
}

export default App;
