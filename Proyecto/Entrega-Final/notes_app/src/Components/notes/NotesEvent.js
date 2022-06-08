import React from 'react'

export const CalendarEvent = ({event}) => {
    // console.log(event);
    const {title, user} = event;
    
    return (
        <div>
            <b>{title}</b>
            <span> - {user.name}</span>
        </div>
    )
}
