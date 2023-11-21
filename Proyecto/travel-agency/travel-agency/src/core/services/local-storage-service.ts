export class LocalStorageService {
  
  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al almacenar en el localStorage:', error);
    }
  }

  static getItem(key) {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error al recuperar del localStorage:', error);
      return null;
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar del localStorage:', error);
    }
  }
}
