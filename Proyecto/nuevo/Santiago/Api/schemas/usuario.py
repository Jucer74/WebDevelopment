from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    Nombre: str
    CorreoElectronico: str
    Contrasena: str

class UsuarioLogin(BaseModel):
    CorreoElectronico: str
    Contrasena: str
    
class Usuario(UsuarioCreate):
    UsuarioID: int

    class Config:
        orm_mode = True
