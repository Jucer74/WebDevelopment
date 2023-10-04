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

# Prueba el endpoint GET para obtener todas las cuentas
def test_get_all_accounts():
    response = client.get("/api/v1/accounts")
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint GET para obtener una cuenta por ID
def test_get_account_by_id():
    account_id = 1  # Reemplaza con un ID válido
    response = client.get(f"/api/v1/accounts/{account_id}")
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint POST para crear una cuenta
def test_create_account():
    new_account = {
        "AccountType": "A",
        "CreationDate": "2023-10-03T00:00:00",
        "AccountNumber": "1234567890",
        "OwnerName": "John Doe",
        "BalanceAmount": 1000.00,
        "OverdraftAmount": 500.00
    }
    response = client.post("/api/v1/accounts", json=new_account)
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint PUT para actualizar una cuenta
def test_update_account():
    account_id = 2  # Reemplaza con un ID válido
    updated_account = {
        "AccountType": "C",
        "CreationDate": "2023-10-03T00:00:00",
        "AccountNumber": "9876543210",
        "OwnerName": "Updated Owner",
        "BalanceAmount": 1500.00,
        "OverdraftAmount": 200.00
    }
    response = client.put(f"/api/v1/accounts/{account_id}", json=updated_account)
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Prueba el endpoint DELETE para eliminar una cuenta
def test_delete_account():
    account_id = 3  # Reemplaza con un ID válido
    response = client.delete(f"/api/v1/accounts/{account_id}")
    assert response.status_code == 200
    # Puedes realizar más aserciones según la respuesta esperada.

# Ejecuta las pruebas con pytest
if __name__ == "__main__":
    pytest.main()
