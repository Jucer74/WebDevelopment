import { PAGE_NAME } from "../const/const";
import { NAVIGATION_ITEMS } from "../const/navigation-items";
import { RouteInterface } from "../interfaces/route";
import { LocalStorageService } from "./../services/local-storage-service";

export const Navbar = ({ user }) => {
  const activeNavItem = (route: RouteInterface) => {
    NAVIGATION_ITEMS.forEach((route) => (route.active = false));
    route.active = true;
  };

  const handleLogout = () => {
    LocalStorageService.removeItem("user");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid g-0">
          <a className="navbar-brand fw-bold fst-italic" href="/">
            {PAGE_NAME}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav d-flex justify-content-center w-100">
              {NAVIGATION_ITEMS.map((route: RouteInterface) => {
                return (
                  <li key={route.name} className="nav-item px-2">
                    <a
                      className={"nav-link ".concat(
                        route.active ? "fw-bold border-bottom border-dark" : ""
                      )}
                      href={route.path}
                      onClick={() => activeNavItem(route)}
                    >
                      {route.name}
                    </a>
                  </li>
                );
              })}
            </ul>
            {user.email === "" ? (
              <div className="d-flex">
                <button
                  className="btn btn-clear fw-semibold text-nowrap me-2"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Iniciar sesion
                </button>
                <button
                  className="btn btn-dark"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <><p>{user.email}</p>
              <form className="d-flex" onSubmit={handleLogout}>
                <button type="submit" className="btn btn-dark text-nowrap">
                  Cerrar sesion
                </button>
              </form></>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
