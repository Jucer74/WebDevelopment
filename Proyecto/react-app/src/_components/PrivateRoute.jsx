// Importa los componentes Navigate y Outlet de 'react-router-dom'.
import { Navigate, Outlet } from 'react-router-dom';

// Importa el hook useSelector de 'react-redux', que se utiliza para obtener información del estado de Redux.
import { useSelector } from 'react-redux';

// Importa el objeto 'history' desde el módulo '_helpers'.
import { history } from '_helpers';

// Exporta el componente PrivateRoute.
export { PrivateRoute };

// Define el componente funcional PrivateRoute.
function PrivateRoute() {
    // Obtiene el estado de autenticación desde el store de Redux.
    const auth = useSelector(x => x.auth.value);

    // Si no hay autenticación, redirige a la página de inicio de sesión con la URL de retorno.
    if (!auth) {
        return <Navigate to="/account/login" state={{ from: history.location }} />;
    }

    // Si está autenticado, permite que las rutas secundarias se rendericen utilizando el componente Outlet.
    return <Outlet />;
}
