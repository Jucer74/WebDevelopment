# Import necessary modules
import os
import sys
from fastapi.testclient import TestClient  # Assuming "TestClient" is from FastAPI
from app import app  # Assuming "app" is your FastAPI application instance

# Get the absolute path of the project root directory
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Insert the project root directory at the beginning of the system path
sys.path.insert(0, project_root)

# Create a test client for the FastAPI application
client = TestClient(app)

# Test case to check if all accounts can be retrieved
def test_get_all_accounts():
    response = client.get("/api/v1/accounts")
    assert response.status_code == 200  # Expecting a successful HTTP response (status code 200)

# Test case to check if an account can be retrieved by its ID
def test_get_account_by_id():
    account_id = 1
    response = client.get(f"/api/v1/accounts/{account_id}")
    assert response.status_code == 200  # Expecting a successful HTTP response (status code 200)

# Test case to create a new account
def test_create_account():
    new_account = {
        "Id": 1,
        "AccountType": "A",
        "CreationDate": "2023-10-03T00:00:00",
        "AccountNumber": "1234567890",
        "OwnerName": "John Doe",
        "BalanceAmount": 11000.00,
        "OverdraftAmount": 5000.00
    }
    response = client.post("/api/v1/accounts", json=new_account)
    assert response.status_code == 200  # Expecting a successful HTTP response (status code 200)

# Test case to update an existing account
def test_update_account():
    account_id = 2
    updated_account = {
        "Id": account_id,
        "AccountType": "C",
        "CreationDate": "2023-10-03T00:00:00",
        "AccountNumber": "1010105366",
        "OwnerName": "Juan Hurtado",
        "BalanceAmount": 15000.00,
        "OverdraftAmount": 2000.00
    }
    response = client.put(f"/api/v1/accounts/{account_id}", json=updated_account)
    assert response.status_code == 200  # Expecting a successful HTTP response (status code 200)

# Test case to delete an account by its ID
def test_delete_account():
    account_id = 2
    response = client.delete(f"/api/v1/accounts/{account_id}")
    assert response.status_code == 200  # Expecting a successful HTTP response (status code 200)

# Execute the test cases if this script is run directly
if __name__ == "__main__":
    import pytest
    pytest.main()
