import React, { useState, useEffect } from 'react';

import {Card,Button,ButtonGroup} from 'react-bootstrap';


function AdminCardProduct({product, handleEdit, handleDelete, handleDetails }) {

    const handleEditClick = () => {
        handleEdit(product);
    };

    const handleDeleteClick = () => {
        handleDelete(product);
    };

    const handleDetailsClick = () => {
        handleDetails(product);
    };



    return(
        <>

            <Card  className='shadow-lg' style={{ width: '18rem',height: '100%', borde:'none' }}>
                <Card.Img variant="top" src={product.img} className='p-2' style={{ borderRadius: '8%', cursor:'pointer'}} onClick={handleDetailsClick}/>
                <Card.Body className='d-flex flex-column justify-content-between'>
                    <Card.Title className='fs-4 mt-2'>{product.titulo}</Card.Title>
                    <Card.Text className='fs-6 text-secondary fw-light'> {product.descripcion.length > 75 ? product.descripcion.substring(0,75) + '...' : product.descripcion }</Card.Text>
                    <p className='text-black-50'>$ {product.precio}</p>
                    <ButtonGroup aria-label="crudButtons" className='w-100 rounded-pill' style={{  bordeRadius: '50%', overflow: 'hidden', }}>
                        <Button variant="secondary" className='text-black fw-medium icon-link icon-link-hover' style={{backgroundColor: '#d9c243', border: 'none'}} onClick={handleEditClick}>Editar</Button>
                        <Button variant="secondary" className='text-black fw-medium icon-link icon-link-hover' style={{backgroundColor: '#d99843', border: 'none',}} onClick={handleDeleteClick}>Eliminar</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        
        </>







    )

}

export default AdminCardProduct;