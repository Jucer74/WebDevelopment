import pytest
from fastapi.testclient import TestClient
import sys
import os

# Obtén la ruta al directorio raíz del proyecto
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Agrega el directorio raíz al sys.path
sys.path.insert(0, project_root)

# Importa tu aplicación FastAPI aquí
from app import app

# Crea un cliente de prueba
client = TestClient(app)

# Prueba el endpoint GET para obtener todos los estudiantes
def test_get_all_students():
    response = client.get("/api/v1/students")
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint GET para obtener un estudiante por Id
def test_get_student_by_id():
    student_id = 5  # Reemplaza con un ID válido
    response = client.get(f"/api/v1/students/{student_id}")
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint POST para crear un estudiante
def test_create_student():
    new_student = {
        "Id": 29,
        "FirstName": "John",
        "LastName": "Doe",
        "DateOfBirth": "1990-01-01T00:00:00",
        "Sex": "M"
    }
    response = client.post("/api/v1/students", json=new_student)
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint PUT para actualizar un estudiante
def test_update_student():
    student_id = 2  # Reemplaza con un ID válido
    updated_student = {
        "Id": 2,
        "FirstName": "UpdatedFirstName",
        "LastName": "UpdatedLastName",
        "DateOfBirth": "200-01-01T00:00:00",
        "Sex": "F"
    }
    response = client.put(f"/api/v1/students/{student_id}", json=updated_student)
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint DELETE para eliminar un estudiante
def test_delete_student():
    student_id = 29  # Reemplaza con un ID válido
    response = client.delete(f"/api/v1/students/{student_id}")
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Ejecuta las pruebas con pytest
if __name__ == "__main__":
    pytest.main()
