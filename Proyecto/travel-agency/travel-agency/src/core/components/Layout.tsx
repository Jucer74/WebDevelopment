import { Navbar } from "./Navbar";
import { Login } from "./Login";
import { Register } from "./Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../../modules/landing/LandingPage";
import { TravelsPage } from "../../modules/travels/TravelsPage";
import { User } from "../services/interfaces/user";
import { useState } from "react";

const initialUser: User = {
  id: 0,
  username: "",
  email: "",
  password: "",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "/explore",
    element: <TravelsPage></TravelsPage>,
  },
]);
<RouterProvider router={router} />;

export const Layout = () => {
  const getLoggedUser = () => {
    const userFound = localStorage.getItem("user");
    if (userFound) {
      return JSON.parse(JSON.parse(userFound));
    } else {
      return initialUser;
    }
  };
  const [user, setUser] = useState(getLoggedUser());

  return (
    <>
      <div className="container h-100">
        <header className="col-12 mb-5 sticky-top">
          <Navbar user={user}></Navbar>
        </header>
        <main className="col-12 h-100">
          <RouterProvider router={router} />
        </main>
      </div>
      {/* Login */}
      <div
        className="modal fade"
        id="loginModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Iniciar sesion
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Login setUser={setUser}></Login>
            </div>
          </div>
        </div>
      </div>
      {/* Register */}
      <div
        className="modal fade"
        id="registerModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Registrarse
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Register></Register>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
