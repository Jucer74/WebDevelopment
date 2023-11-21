// NavigationBar.js

import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export function NavigationBar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });

    navigate("/Login");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand
          as={Link}
          to="/Home"
          style={{ marginLeft: "10px" }}
          className="text-white "
        >
          Bancolombia
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="bg-secondary border-0"
        >
          <span className="navbar-toggler-icon "></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Home" className="text-white">
              Inicio
            </Nav.Link>
            <Nav className="mr-auto">
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/Users" className="text-white">
                    Cuentas
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Transactions" className="text-white">
                    Transacciones
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav.Link as={Link} to="/Contact" className="text-white">
              Contacto
            </Nav.Link>
            <Nav>
              {isLoggedIn ? (
                <>
                  <Nav.Link className="text-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </Nav.Link>
                  <Navbar.Text className="mr-5 ms-2 text-white">
                    {user.username}
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Nav.Link className="text-success" as={Link} to="/Login">
                    Iniciar Sesión
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
