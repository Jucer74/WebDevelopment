from fastapi import FastAPI, HTTPException, Header

app = FastAPI()

# Simulación de un diccionario de claves API válidas (en la vida real, esto debe ser almacenado y gestionado de forma segura)
valid_api_keys = {"my_api_key": "my_secret"}

# Función para verificar la clave API en las solicitudes
def verify_api_key(api_key: str = Header(None)):
    if api_key not in valid_api_keys:
        raise HTTPException(status_code=401, detail="Clave API no válida")

@app.get("/api/resource")
def get_protected_resource(api_key: str = Header(None, convert_underscores=False)):
    # Verificar la clave API antes de permitir el acceso al recurso protegido
    verify_api_key(api_key)
    return {"message": "Este es un recurso protegido"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)