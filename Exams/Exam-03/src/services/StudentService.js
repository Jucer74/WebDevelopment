export default class StudentService {
  constructor() {
    this.API_URL = "http://localhost:3000/students";
  }

  /**
   * Get all items on the database
   * @returns Json with all items
   */
  async getAllAsync() {
    const config = {
      method: "GET",
    };
    const response = await fetch(this.API_URL, config);
    return response.json();
  }

  /**
   * Get the item from the database with the given id
   * @param id An id of item that you want to obtain
   * @returns Json with the item
   */
  async getByIdAsync(id) {
    const config = {
      method: "GET",
    };
    const response = await fetch(`${this.API_URL}/${id}`, config);
    return response.json();
  }

  /**
   * Add an given item to the database
   * @param subject The item that you want to add
   * @returns String with the response of the api
   */
  async addAsync(subject) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    };
    var response = await fetch(this.API_URL, config);
    return response.text();
  }

  /**
   * Edit an given item in the database
   * @param id Id of the item that you want to edit
   * @param subject The item with the edited data
   * @returns String with the response of the api
   */
  async editAsync(id, subject) {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    };
    const response = await fetch(`${this.API_URL}/${id}`, config);
    return response.text();
  }

  /**
   * Delete an item from the database with the given id
   * @param id Id of the item that you want to delete
   * @returns String with the response of the api
   */
  async deleteAsync(id) {
    var config = {
      method: "DELETE",
    };
    const response = await fetch(`${this.API_URL}/${id}`, config);
    return response.text();
  }
}
