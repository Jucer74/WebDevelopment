import { combineReducers } from "redux";
import { calendarReducer } from "./notesReducer";
import { uiReducer } from "./uiReducer";


export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
})
