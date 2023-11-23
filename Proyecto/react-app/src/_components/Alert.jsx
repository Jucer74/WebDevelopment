// Importa el hook useEffect de React, que permite realizar efectos secundarios en componentes funcionales.
import { useEffect } from 'react';

// Importa los hooks useDispatch y useSelector de react-redux, que se utilizan para interactuar con el store de Redux.
import { useDispatch, useSelector } from 'react-redux';

// Importa el hook useLocation de react-router-dom, que proporciona información sobre la ubicación actual en la interfaz de la aplicación.
import { useLocation } from 'react-router-dom';

// Importa las acciones relacionadas con las alertas desde el store de Redux.
import { alertActions } from '_store';

// Exporta el componente Alert.
export { Alert };

// Define el componente funcional Alert.
function Alert() {
    // Obtiene la función dispatch de Redux para despachar acciones.
    const dispatch = useDispatch();

    // Obtiene la ubicación actual de la aplicación.
    const location = useLocation();

    // Obtiene el estado de las alertas desde el store de Redux.
    const alert = useSelector(x => x.alert.value);

    // Utiliza el hook useEffect para realizar acciones cuando cambia la ubicación.
    useEffect(() => {
        // Limpia la alerta cuando cambia la ubicación.
        dispatch(alertActions.clear());
    }, [location]);

    // Si no hay alerta, devuelve null y no renderiza nada.
    if (!alert) return null;

    // Renderiza el componente de alerta con el mensaje y tipo de alerta del estado.
    return (
        <div className="container">
            <div className="m-3">
                <div className={`alert alert-dismissible ${alert.type}`}>
                    {alert.message}
                    {/* Renderiza un botón de cierre que, al hacer clic, limpia la alerta. */}
                    <button type="button" className="btn-close" onClick={() => dispatch(alertActions.clear())}></button>
                </div>
            </div>
        </div>
    );
}
