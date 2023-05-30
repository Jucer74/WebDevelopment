import React,{useState} from 'react';
import {useDispatch } from 'react-redux';
import {Button,Image,Modal,ButtonGroup } from 'react-bootstrap';
import {setOrUpdateOrder} from '../store/slicesOrders/ordersSlice';
import botonCarrito from '../assets/icons/boton de carrito (2).svg';

function DetalleProducto({show, handleDetails, product}){

    const [quantity,setQuantity] = useState(0);

    const dispatch = useDispatch();
    

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

    




    return (
        <Modal show={show} onHide={handleDetails} >
            
        <Modal.Header closeButton />
            <Modal.Body>
                <Image  className='mb-2 w-100' src={product.imgUrl} alt={`Foto de ${product.name}`} rounded="true"/>

                <h1 className='fs-4 mt-2'>{product.name}</h1>
                <p className='fs-6 text-secondary fw-light'>{product.description}</p>
                <p className='text-black-50' >$ {product.price}</p>
                <div className='d-flex justify-content-between'>
                            <ButtonGroup className='align-items-center'>
                                <Button  className='text-black' style={{backgroundColor: '#FEC151',border:'none'}} onClick={addQuantity}>+</Button>
                                <span className="mx-2 fw-bolder" style={{ display: 'inline-block', verticalAlign: 'middle' }}>{quantity}</span>
                                <Button  className='text-black' style={{backgroundColor: '#FEC151',border:'none'}} onClick={minusQuantity}>-</Button>
                            </ButtonGroup>
                            {(quantity > 0) ? <Button className='m- text-black fw-semibolder' style={{backgroundColor: '#FEC151',border:'none'}} onClick={deleteQuantity}>Eliminar</Button> : null}
                            <img  src={botonCarrito} onClick={addToCart} alt="Agregar Al carrito" width="40" height="40" style={{cursor: 'pointer'}}/>
                        </div>

            </Modal.Body>

        
        </Modal>
    );

}


export default DetalleProducto;




