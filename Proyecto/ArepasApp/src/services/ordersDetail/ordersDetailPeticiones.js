import BaseUrl from '../enviroment/enviroment';

// Obtener todos los detalles de pedidos
export async function getAllOrderDetails() {
  return await fetch(`${BaseUrl}/ordersDetail`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Obtener los detalles de un pedido por su ID de pedido
export async function getOrderDetailsByOrderId(orderId) {
  return await fetch(`${BaseUrl}/ordersDetail?orderId=${orderId}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Crear un nuevo detalle de pedido
export async function createOrderDetail(id,orderDetailData) {
  return await fetch(`${BaseUrl}/orders/${id}/ordersDetail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderDetailData)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Actualizar un detalle de pedido existente
export async function updateOrderDetail(orderDetailId, orderDetailData) {
  return await fetch(`${BaseUrl}/ordersDetail/${orderDetailId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderDetailData)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Eliminar un detalle de pedido por su ID
export async function deleteOrderDetail(orderDetailId) {
  return await fetch(`${BaseUrl}/ordersDetail/${orderDetailId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
