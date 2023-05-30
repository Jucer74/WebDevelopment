import React, { useState, useEffect } from 'react';
import {Button, Modal} from 'react-bootstrap';



function DeleteProduct({show, product, handleDelete}){

    //logica peticion eliminar pendiente



    return (

        <>
            <Modal show={show} onHide={handleDelete} >
                

                <Modal.Body >

                    <h1 className='fs-4 mb-5 mt-3 text-center'>Estas seguro de eliminar este producto?</h1>

                    
                    <Button id='button-eliminar-producto' onClick={handleDelete} className='rounded-pill text-black fw-bold p-3 w-100 mb-3' style={{backgroundColor: '#d99843', border: 'none', }}>Eliminar Producto</Button>
                </Modal.Body>

        
            </Modal>
        
        
        
        </>



    );

}




export default DeleteProduct;