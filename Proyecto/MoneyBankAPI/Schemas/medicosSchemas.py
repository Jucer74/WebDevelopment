from pydantic import BaseModel

class MedicoBase(BaseModel):
    imagen: str
    nombre: str
    especialidad: str
    clinica: str

class MedicoCreate(MedicoBase):
    pass

class Medico(MedicoBase):
    medico_id: int

    class Config:
        orm_mode = True
