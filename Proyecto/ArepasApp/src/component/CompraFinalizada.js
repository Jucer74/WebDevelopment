import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {cleanOrder} from '../store/slicesOrders/ordersSlice';
import {Button, Modal} from 'react-bootstrap';



function CompraFinalizada({show, handleDelete}){

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const redirectToHome = () => {
        navigate('/');
    };

    const redirectAndCleanCart= () => {
        redirectToHome();
        handleDelete();
        dispatch(cleanOrder());

    };



    return (

        <>
            <Modal show={show} >

                <Modal.Body >

                    <h1 className='fs-4 mb-5 mt-3 text-center'>Tu compra ha sido realizada.</h1>
                    
                    <Button id='button-editar-producto' onClick={redirectAndCleanCart} className='mt-4 rounded-pill text-black fw-bold p-3 w-100' style={{backgroundColor: '#FEC151', border: 'none', }}>Volver al inicio</Button>
                </Modal.Body>

        
            </Modal>
        
        
        
        </>



    );

}




export default CompraFinalizada;