// http://localhost:5000/usuario?correo=maria@web.com&pass=123456
import BaseUrl from '../enviroment/enviroment';

// Obtener todos los productos
export async function getAllProducts() {
  return await fetch(`${BaseUrl}/products`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Obtener un producto por su ID
export async function getProductById(productId) {
  return await fetch(`${BaseUrl}/products/${productId}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Crear un nuevo producto
export async function createProduct(productData) {
  return await fetch(`${BaseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Actualizar un producto existente
export async function updateProduct(productId, productData) {
  return await fetch(`${BaseUrl}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Eliminar un producto por su ID
export async function deleteProduct(productId) {
  return await fetch(`${BaseUrl}/products/${productId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

//  export const productosPeticiones = () => {
//   return  (userFindByCorreoAndPass)
// }