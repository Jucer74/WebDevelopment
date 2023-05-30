import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeOrder } from '../store/slicesOrders/ordersSlice';
import { Button, Offcanvas, Card } from 'react-bootstrap';
import ProductCardConfirmation from './ProductCardConfirmation';

function ConfirmacionPedido({ show, handleClose }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const orderProducts = useSelector(state => state.shoppingCart);

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  const redirectToPago = () => {
    if (orderProducts.length !== 0) {
      handleClose();
      navigate('/pago');
    } else {
      setShowOverlay(true);
    }
  };

  useEffect(() => {
    setProducts(orderProducts);
    setTotalPrice(calculateTotal(orderProducts));
  }, [orderProducts]);

  const calculateTotal = products => {
    let total = 0;
    products.forEach(product => {
      total += product.cantidad * product.productData.price;
    });
    return total;
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header className="rounded-bottom shadow-sm" style={{ backgroundColor: '#FEC151', border: 'none' }} closeButton>
          <Offcanvas.Title className="my-2 fw-bold">Confirmación Pedido</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {products.map(product => (
            <ProductCardConfirmation product={product} key={product.productData.id}/>
          ))}
          <h4 className="text-black fw-semibold">Precio Total: ${totalPrice} </h4>
          <Button id="button-pagar" onClick={redirectToPago} className="rounded-pill text-black fw-bold p-3 w-100 my-2" style={{ backgroundColor: '#FEC151', border: 'none' }}>
            Confirmar y pagar
          </Button>
          {showOverlay && <div className="text-center">Aún no tienes nada en tu carrito, ¿Que esperas para llenarlo?</div>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ConfirmacionPedido;
