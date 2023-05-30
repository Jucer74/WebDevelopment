import BaseUrl from './enviroment/enviroment';

export const peticiones = {
  GetAllProducts: async () => {
    try {
      const response = await fetch(`${BaseUrl}/products`);
      return response;
    } catch (error) {
      return error;
    }
  },

  GetProductsByPage: async () => {
    try {
      const response = await fetch(`${BaseUrl}/products`);
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  GetProductById: async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/products/${id}`);
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  PostProduct: async (form) => {
    try {
      const response = await fetch(`${BaseUrl}/products`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  UpdateProduct: async (form, id) => {
    try {
      const response = await fetch(`${BaseUrl}/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  RemoveProduct: async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/products/${id}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  GetProductsByCategory: async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/categories/${id}/products`);
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  GetAllCategories: async () => {
    try {
      const response = await fetch(`${BaseUrl}/categories`);
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  GetCategoryById: async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/categories/${id}`);
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  PostCategory: async (form) => {
    try {
      const response = await fetch(`${BaseUrl}/categories`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  UpdateCategory: async (form, id) => {
    try {
      const response = await fetch(`${BaseUrl}/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },

  RemoveCategory: async (id) => {
    try {
      const response = await fetch(`${BaseUrl}/categories/${id}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      console.log('Hubo un problema con la petición:', error.message);
    }
  },
};

export default peticiones;
