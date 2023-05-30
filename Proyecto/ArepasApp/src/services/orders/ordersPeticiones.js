import BaseUrl from '../enviroment/enviroment';

// Obtener todos los pedidos
export async function getAllOrders() {
  return await fetch(`${BaseUrl}/orders`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Obtener un pedido por su ID
export async function getOrderById(orderId) {
  return await fetch(`${BaseUrl}/orders/${orderId}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Crear un nuevo pedido
export async function createOrder(orderData) {
  return await fetch(`${BaseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Actualizar un pedido existente
export async function updateOrder(orderId, orderData) {
  return await fetch(`${BaseUrl}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Eliminar un pedido por su ID
export async function deleteOrder(orderId) {
  return await fetch(`${BaseUrl}/orders/${orderId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
