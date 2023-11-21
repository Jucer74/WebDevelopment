import { UserLogin } from "./dto/user-login";
import { User } from "./interfaces/user";

export class UserService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000'; // Ajusta la URL según la configuración de tu servidor JSON.
    this.baseUrl += '/users';
  }

  async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la solicitud');
    }
    return await response.json();
  }

  async getUsers() {
    try {
      const response = await fetch(this.baseUrl);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async getUserById(userId: number) {
    try {
      const response = await fetch(`${this.baseUrl}/${userId}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }

  async getUserByCredentials(credentials: UserLogin) {
    try {
      const response = await fetch(`${this.baseUrl}?email=${credentials.email}&password=${credentials.password}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al obtener usuario por credenciales:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const response = await fetch(`${this.baseUrl}?email=${email}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }
  }

  async createUser(user: User) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

}

