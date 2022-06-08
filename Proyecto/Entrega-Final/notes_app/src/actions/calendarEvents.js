import { types } from "../types/types";


export const eventAddNew = (event) => ({
    type: types.calendarAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.calendarSetActive,
    payload: event
});

export const eventCleanActiveNote = () => ({
    type: types.calendarClearActiveNote,
})

export const eventUpdateNote = (event) => ({
    type: types.calendarUpdateNote,
    payload: event,
})

export const eventDeleteteNote = (event) => ({
    type: types.calendarDeleteNote,
})
