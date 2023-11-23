// Importa el componente NavLink de 'react-router-dom', que se utiliza para la navegación dentro de la aplicación manteniendo el estado del enlace actual.
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { NavDropdown } from 'react-bootstrap';
import "../styles/nav.css";
// Importa los hooks useSelector y useDispatch de 'react-redux', que se utilizan para obtener y despachar acciones en el store de Redux.
import { useSelector, useDispatch } from 'react-redux';

// Importa las acciones relacionadas con la autenticación desde el store de Redux.
import { authActions } from '_store';

// Exporta el componente Nav.
export { Nav };

// Define el componente funcional Nav.
function Nav() {
    // Obtiene el estado de autenticación desde el store de Redux.
    const auth = useSelector(x => x.auth.value);

    // Obtiene la función dispatch de Redux para despachar acciones.
    const dispatch = useDispatch();

    // Define una función logout que despacha la acción de logout del store de Redux.
    const logout = () => dispatch(authActions.logout());

    // Si no hay autenticación, no renderiza nada (null).
    if (!auth) return null;

    // Renderiza la barra de navegación con enlaces NavLink y un botón de logout.
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarNav">
    <div className="navbar-nav mx-auto" style={{ margin: "auto" }}>
      <NavLink to="/" className="nav-item nav-link">Home</NavLink>
      <NavLink to="/aboutsection" className="nav-item nav-link">About</NavLink>

      <div className="ml-auto">
        <NavDropdown
          title={
            <div className="d-flex justify-content-end">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </div>
          }
          id="navbarDropdownMenuAvatar"
        >
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/users">Manage Users</NavDropdown.Item>
        
        </NavDropdown>
      </div>

      <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
      {/* <NavLink to="/rent" className="nav-item nav-link">Rent</NavLink> */}

    </div>
  </div>
</nav>




















    );
}
