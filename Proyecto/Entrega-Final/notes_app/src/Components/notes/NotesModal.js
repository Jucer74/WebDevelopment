import React from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventCleanActiveNote, eventUpdateNote } from '../../actions/calendarEvents';
import { useEffect } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const nowTime = moment().minute(0).second(0).add(1, 'hours');
const nowTimePlus = nowTime.clone().add(1, 'hours')


const initialEvent = {
    title: "",
    notes: "",
    start: nowTime.toDate(),
    end: nowTimePlus.toDate()
}

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(nowTime.toDate())
    const [dateEnd, setDateEnd] = useState(nowTimePlus.toDate())
    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setFormValues] = useState(initialEvent)

    const { title, notes, start, end } = formValues

    const dispatch = useDispatch()

    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    useEffect(() => {
        // console.log(activeEvent);
        if (activeEvent) {
            setFormValues(activeEvent)
        }else{
            setFormValues(initialEvent)
        }

    }, [activeEvent, setFormValues])

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        // console.log("close");
        dispatch(uiCloseModal())
        dispatch(eventCleanActiveNote())

        setFormValues(initialEvent)
    }

    const handleStartDateChange = (e) => {
        // console.log(e);
        setDateStart(e);

        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        // console.log(e);
        setDateEnd(e);

        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmit = (e) => {
        // console.log(formValues);
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire("Error", "Fecha fin debe ser mayor a la fecha de inicio", 'error')
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        setTitleValid(true);
        closeModal();

        // CREAR
        if (activeEvent === null) {
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: "001",
                    name: "David Garrido",
                }
            }))
            // ACTUALIZAR
        } else {
            dispatch(eventUpdateNote(formValues))
        }
    }
    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {activeEvent !== null 
            ? "Editando evento..." 
            : "Creando evento..."} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmit}
            // noValidate
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        format="dd/MM/yyyy hh:mm aa"
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        format="dd/MM/yyyy hh:mm aa"
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && "is-invalid"}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
