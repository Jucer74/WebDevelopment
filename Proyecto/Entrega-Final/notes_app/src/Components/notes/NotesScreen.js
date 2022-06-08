import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "moment/locale/es"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { messages } from '../../helpers/notes-esp'
import { CalendarEvent } from './NotesEvent'
import { useState } from 'react'
import { CalendarModal } from './NotesModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventCleanActiveNote, eventSetActive } from '../../actions/calendarEvents'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es');

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");
    // console.log(lastView);

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)

    const onDoubleClick = (e) => {
        // console.log(e);
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        // console.log(e);
        dispatch(eventSetActive(e))


    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    const onSelectSlot = (e) => {
        dispatch(eventCleanActiveNote())
    }

    return (
        <div
            className="calendar-screen"
        >
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            {
                activeEvent !== null && <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    )
}
