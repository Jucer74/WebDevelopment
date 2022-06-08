import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleteteNote } from '../../actions/calendarEvents'

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(eventDeleteteNote());
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            type="button"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
        </button>
    )
}
