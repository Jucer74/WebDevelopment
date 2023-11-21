import { RouteInterface } from "../interfaces/route";

export const NAVIGATION_ITEMS: RouteInterface[] = [
    {
      name: "Inicio",
      path: "/",
      active: true
    },
    {
      name: "Viajes",
      path: "/#travels",
      active: false
    },
    {
      name: "Opiniones",
      path: "/#opinions",
      active: false
    },
    {
      name: "Contacto",
      path: "/#contact",
      active: false
    },
    {
      name: "Explorar",
      path: "/explore",
      active: false
    },
  ];