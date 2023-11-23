// Importamos los componentes necesarios
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Exportamos el componente Nav
export { Nav };

// Definimos el componente Nav
function Nav() {
 // Usamos el hook useSelector para obtener el estado de autenticación
 const auth = useSelector(x => x.auth.value);
 // Usamos el hook useDispatch para obtener la función dispatch de Redux
 const dispatch = useDispatch();
 // Definimos la función logout que desautentica al usuario
 const logout = () => dispatch(authActions.logout());

 // Si el usuario no está autenticado, no mostramos la barra de navegación
 if (!auth) return null;

 // Definimos el JSX de la barra de navegación
 return (
     <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: '#5A1816' }}>
         
         <div className="navbar-nav me-auto">
             <NavLink to="/" className="nav-item nav-link text-white">Home</NavLink>
             <NavLink to="/users" className="nav-item nav-link text-white">Users</NavLink>
             <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
         </div>
         <div className="navbar-nav ms-auto">
             
             <span className="nav-item nav-link text-white">
               <FontAwesomeIcon icon={faUser} /> {auth.username}
             </span>
             
             <button onClick={logout} className="btn btn-link nav-item nav-link text-white">
               <FontAwesomeIcon icon={faSignOutAlt} /> Logout
             </button>
         </div>
     </nav>
 );
}

