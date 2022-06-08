import moment from "moment";
import { types } from "../types/types";


const initialState = {
    events: [{
        id: new Date().getTime(),
        title: "Nota de prueba",
        start: moment().toDate(),
        end: moment().add(1, 'hours').toDate(),
        bgcolor: "#fafafa",
        notes: "Realizar tarea de aplicaciones web",
        user: {
            _id: "001",
            name: "David Garrido"
        }
    }],
    activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.calendarSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.calendarAddNew:
            return {
                ...state,
                events: [
                    action.payload,
                    ...state.events
                ]
            }
        case types.calendarClearActiveNote:
            return {
                ...state,
                activeEvent: null,
            }
        case types.calendarUpdateNote:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id)
                        ? action.payload
                        : e

                )
            }
            case types.calendarDeleteNote:
                return {
                    ...state,
                    events: state.events.filter(
                        e => (e.id !== state.activeEvent.id)
                    ),
                    activeEvent: null,
                }
        default:
            return state
    }
}