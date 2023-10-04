import pytest
from fastapi.testclient import TestClient
import sys
import os

# Obtiene la ruta del directorio principal del proyecto
project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Agrega el directorio principal al sys.path
sys.path.insert(0, project_dir)

# Importa la aplicación FastAPI desde el módulo "app"
from app import app

# Crea un cliente de prueba para la aplicación
client = TestClient(app)

# Pruebas unitarias para los endpoints de la API
def test_get_all_accounts():
    # Prueba obtener todas las cuentas
    response = client.get("/api/v1/accounts")
    assert response.status_code == 200
    # Agrega aserciones adicionales según las respuestas esperadas.

def test_get_account_by_id():
    # Prueba obtener una cuenta por su ID (reemplaza con un ID válido)
    account_id = 3
    response = client.get(f"/api/v1/accounts/{account_id}")
    assert response.status_code == 200
    # Agrega aserciones adicionales según las respuestas esperadas.

def test_create_account():
    # Prueba crear una nueva cuenta
    new_account = {
        "AccountType": "Savings",
        "CreationDate": "2023-10-03T00:00:00",
        "AccountNumber": "1234567890",
        "OwnerName": "Jane Smith",
        "BalanceAmount": 1000.00,
        "OverdraftAmount": 500.00
    }
    response = client.post("/api/v1/accounts", json=new_account)
    assert response.status_code == 200
    # Agrega aserciones adicionales según las respuestas esperadas.

def test_update_account():
    # Prueba actualizar una cuenta (reemplaza con un ID válido)
    account_id = 2
    updated_account = {
        "AccountType": "Checking",
        "CreationDate": "2023-10-03T00:00:00",
        "AccountNumber": "9876543210",
        "OwnerName": "Updated Owner",
        "BalanceAmount": 1500.00,
        "OverdraftAmount": 200.00
    }
    response = client.put(f"/api/v1/accounts/{account_id}", json=updated_account)
    assert response.status_code == 200
    # Agrega aserciones adicionales según las respuestas esperadas.

def test_delete_account():
    # Prueba eliminar una cuenta (reemplaza con un ID válido)
    account_id = 3
    response = client.delete(f"/api/v1/accounts/{account_id}")
    assert response.status_code == 200
    # Agrega aserciones adicionales según las respuestas esperadas.

# Ejecuta las pruebas utilizando pytest
if __name__ == "__main__":
    pytest.main()
