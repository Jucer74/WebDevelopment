import React from "react";
import { Route, Routes } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { Banner } from "../../../components/Banner";
import Students from "./Students";
import Subjects from "./Subjects";

export default function Home() {
  return (
    <>
      <header>
        <NavigationBar />
        <Banner></Banner>
      </header>
      <main className="container-fluid g-0 w-75">
        <Routes>
          <Route path="/" element={<Subjects />} />
          <Route path="/home" element={<Subjects />} />
          <Route path="/Subjects" element={<Subjects />} />
          <Route path="/Students" element={<Students />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  );
}
