import React, { useState, useEffect } from 'react';
import {Button,Modal, Form } from 'react-bootstrap';


//EDITAR PRODUCTO FALTAAAA


function EditProduct({show, handleEdit, product}){

    const [formInfo,setFormInfo] = useState({
    imgUrl: product.img,
    titulo: product.titulo,
    descripcion: product.descripcion,
    precio: product.precio
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'precio' ? Number(value) : value;
        setFormInfo((prevFormInfo) => ({
          ...prevFormInfo,
          [name]: newValue
        }));
      };




    //Logica de peticion Update falta
    

    return(


        <>
        <Modal show={show} onHide={handleEdit} >
            

            <Modal.Body>
                <Form>
                    <Form.Group controlId="formImgUrl">
                        <Form.Label>URL de la imagen</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la URL de la imagen"
                            name="imgUrl"
                            value={formInfo.imgUrl}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                
                    <Form.Group controlId="formTitulo">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el título"
                            name="titulo"
                            value={formInfo.titulo}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Ingrese la descripción"
                            name="descripcion"
                            value={formInfo.descripcion}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                
                    <Form.Group controlId="formPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el precio"
                            name="precio"
                            value={formInfo.precio}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>

                
                <Button id='button-editar-producto' onClick={handleEdit} className='mt-4 rounded-pill text-black fw-bold p-3 w-100' style={{backgroundColor: '#d9c243', border: 'none', }}>Editar</Button>
            </Modal.Body>

    
        </Modal>
        
        
        
        
        </>
    );


}



export default EditProduct;