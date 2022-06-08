import React from 'react'
import { useHistory } from 'react-router-dom';

export const Navbar = () => {

    const history = useHistory();

    return (
        <div
            className="navbar navbar-dark bg-dark mb-4"
        >
            <span
                className="navbar-brand center"
                style={{ textAlign: "center" }}
            >
                <strong>
                    Bienvenido a la aplicación de notas
                </strong>                
            </span>
            <button
                className="btn btn-warning btn-sm"
                type="button"
            >
                <i
                    className="fas fa-sign-out-alt mr-1"
                    style={{ color: "red" }}
                />
                <span
                    style={{ color: "white" }}
                    onClick={()=> history.push("logout")}
                >
                    Salir</span>
            </button>
        </div>
    )
}
