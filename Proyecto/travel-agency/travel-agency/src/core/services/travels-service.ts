import { Travel } from "./interfaces/travel";

export class TravelsService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/travels';
  }

  async getTravels(query?: string) {
    try {
      const urlQuery: string = query ? `${this.baseUrl}?q=${query}` : this.baseUrl;
      const response = await fetch(urlQuery);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al obtener viajes:', error);
      throw error;
    }
  }

  async getTravelById(travelId: number) {
    try {
      const response = await fetch(`${this.baseUrl}/${travelId}`);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al obtener viaje por ID:', error);
      throw error;
    }
  }

  async createTravel(travelData: Travel) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelData),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al crear viaje:', error);
      throw error;
    }
  }

  async updateTravel(travelId: number, updatedTravelData: Travel) {
    try {
      const response = await fetch(`${this.baseUrl}/${travelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTravelData),
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al actualizar viaje:', error);
      throw error;
    }
  }

  async deleteTravel(travelId: number) {
    try {
      const response = await fetch(`${this.baseUrl}/${travelId}`, {
        method: 'DELETE',
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error al eliminar viaje:', error);
      throw error;
    }
  }

  async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la solicitud');
    }
    return await response.json();
  }
}

