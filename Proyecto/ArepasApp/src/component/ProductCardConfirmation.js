import React, { useState} from 'react';
import {useDispatch } from 'react-redux';
import { removeOrder } from '../store/slicesOrders/ordersSlice';
import {Button,Card } from 'react-bootstrap';




function ProductCardConfirmation({product}){

    const dispatch = useDispatch();
    
    const deleteQuantity = id => {
        dispatch(removeOrder(id));
      };

    return (
        <>
            <Card className="my-3 rounded-4 shadow-lg" key={product.productData.id}>
                <Card.Body className="d-flex align-items-center">
                <div>
                    <Card.Img className="mb-3" src={product.productData.imgUrl} alt={`Imagen de ${product.productData.name}`} rounded="true" />
                    <Card.Title>{product.productData.name}</Card.Title>
                    <Card.Text className="fs-6 text-secondary fw-light">
                    {product.productData.description.length > 35
                        ? product.productData.description.substring(0, 35) + '...'
                        : product.productData.description}
                    </Card.Text>
                    <Card.Text className="fs-6 text-secondary fw-light">Cantidad: {product.cantidad}</Card.Text>
                    <Card.Text className="fs-6 text-secondary fw-light">Precio: $ {product.cantidad * product.productData.price}</Card.Text>
                    <div className="d-flex justify-content-between">
                    <Button className="m- text-black fw-semibolder" style={{ backgroundColor: '#FEC151', border: 'none' }} onClick={() => deleteQuantity(product.productData.id)}>
                        Eliminar
                    </Button>
                    </div>
                </div>
                </Card.Body>
            </Card>
        
        </>
    );


    
}

export default ProductCardConfirmation;