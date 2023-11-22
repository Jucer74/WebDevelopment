from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Schemas.medicosSchemas import MedicoBase
from Config.database import SessionLocal
from Models.medicosModel import MedicoModel

router = APIRouter()

# Rutas para la entidad "Medico"
@router.get("/medicos", tags=["Medicos"])
async def get_all_medicos():
    try:
        medicos = SessionLocal().query(MedicoModel).all()
        return medicos

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

@router.get("/medicos/{id}", tags=["Medicos"])
async def get_medico_by_id(id: int):
    try:
        medico = SessionLocal().query(MedicoModel).filter(MedicoModel.medico_id == id).first()
        if medico is None:
            raise HTTPException(status_code=404, detail="Medico not found")
        return medico

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

@router.post("/medicos", tags=["Medicos"])
async def create_medico(medico: MedicoBase):
    session = SessionLocal()

    try:
        new_medico = MedicoModel(
            nombre=medico.nombre,
            especialidad=medico.especialidad,
            imagen=medico.imagen,
            clinica=medico.clinica
        )

        session.add(new_medico)
        session.commit()

        session.refresh(new_medico)

        return new_medico

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

@router.put("/medicos/{id}", tags=["Medicos"])
async def update_medico(id: int, medico: MedicoBase):
    session = SessionLocal()

    try:
        existing_medico = session.query(MedicoModel).filter(MedicoModel.medico_id == id).first()

        if existing_medico is None:
            raise HTTPException(status_code=404, detail="Medico not found")

        existing_medico.nombre = medico.nombre
        existing_medico.especialidad = medico.especialidad
        existing_medico.imagen = medico.imagen
        existing_medico.clinica = medico.clinica

        session.commit()

        session.refresh(existing_medico)

        return existing_medico

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

@router.delete("/medicos/{id}", tags=["Medicos"])
async def delete_medico(id: int):
    session = SessionLocal()

    try:
        existing_medico = session.query(MedicoModel).filter(MedicoModel.medico_id == id).first()

        if existing_medico is None:
            raise HTTPException(status_code=404, detail="Medico not found")

        session.delete(existing_medico)

        session.commit()

        return {"message": "medico deleted"}

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()
