import React, { useState} from 'react';
import {useDispatch } from 'react-redux';
import {setOrUpdateOrder} from '../store/slicesOrders/ordersSlice';
import {Button,ButtonGroup,Card } from 'react-bootstrap';
import botonCarrito from '../assets/icons/boton de carrito (2).svg';



function CardProduct({product, handleDetails}){

    const [quantity,setQuantity] = useState(0);

    const dispatch = useDispatch();

    const handleDetailsClick = () => {
        handleDetails(product);
    };

    const addQuantity = () => {

        setQuantity(prevState =>(prevState + 1));
    };

    const minusQuantity = () => {


        if (quantity > 0){

            setQuantity(prevState =>(prevState - 1));
        }

    };

    const deleteQuantity = () => {

        setQuantity(0);

    }


   
    
    
    const addToCart = () => {
        
        if (quantity>0) {
    
            let cartQuantity = quantity; 
    
            let newItem = product;
    
            let cartItem = {
    
                productData: newItem,
    
                cantidad: cartQuantity
    
            }
            dispatch(setOrUpdateOrder(cartItem));
            deleteQuantity();

        }

    }




    return(

        <>
            <Card className='my-3 rounded-4 shadow-lg ' >
                <Card.Body className='d-flex align-items-center'>
                    <div>
                    <Card.Img className='mb-3' src={product.imgUrl} alt={`Imagen de ${product.name}`} onClick={handleDetailsClick} rounded="true"/>
                    
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text> $ {product.price} </Card.Text>
                        <Card.Text className='fs-6 text-secondary fw-light'> {product.description.length > 35 ? product.description.substring(0, 35) + '...' : product.description}</Card.Text>
                        <div className='d-flex justify-content-between'>
                            <ButtonGroup className='align-items-center'>
                                <Button  className='text-black' style={{backgroundColor: '#FEC151',border:'none'}} onClick={addQuantity}>+</Button>
                                <span className="mx-2 fw-bolder" style={{ display: 'inline-block', verticalAlign: 'middle' }}>{quantity}</span>
                                <Button  className='text-black' style={{backgroundColor: '#FEC151',border:'none'}} onClick={minusQuantity}>-</Button>
                            </ButtonGroup>
                            {(quantity > 0) ? <Button className='m- text-black fw-semibolder' style={{backgroundColor: '#FEC151',border:'none'}} onClick={deleteQuantity}>Eliminar</Button> : null}
                            <img  src={botonCarrito} onClick={addToCart} alt="Agregar Al carrito" width="40" height="40" style={{cursor: 'pointer'}}/>
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </>


    );

    
}






export default CardProduct;