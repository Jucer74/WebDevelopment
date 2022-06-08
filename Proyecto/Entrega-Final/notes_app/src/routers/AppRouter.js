import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LoginScreen } from '../Components/auth/LoginScreen'
import { CalendarScreen as NotesScreen } from '../Components/notes/NotesScreen'

export const AppRouter = () => {
    return (

        <Router>
            <div>
                <Switch>
                    {/* Login */}
                    <Route
                        exact
                        path="/"
                        component={LoginScreen}                                        
                    />
                    {/* Notes */}
                    <Route
                        exact
                        path="/notas"
                        component={NotesScreen}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
