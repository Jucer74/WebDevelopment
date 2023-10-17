from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.studentsModel import StudentModel
from Schemas.studentsSchema import StudentSchema
from Config.database import SessionLocal

# Crea un nuevo enrutador
router = APIRouter()

# Read all students
@router.get("/students", tags=["Students"])
async def get_all_students():
    try:
        students = SessionLocal().query(StudentModel).all()
        return students
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Read a student by Id
@router.get("/students/{id}", tags=["Students"])
async def get_student_by_id(id: int):
    try:
        student = SessionLocal().query(StudentModel).filter(StudentModel.Id == id).first()
        if student is None:
            raise HTTPException(status_code=404, detail="Student not found")
        return student
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Create a new student
@router.post("/students", tags=["Students"])
async def create_student(student: StudentSchema):
    # Crea una única instancia de sesión
    session = SessionLocal()
    
    try:
        new_student = StudentModel(
            Id = student.Id,
            FirstName=student.FirstName,
            LastName=student.LastName,
            DateOfBirth=student.DateOfBirth,
            Sex=student.Sex
        )
        
        # Agrega el nuevo estudiante y confirma la transacción
        session.add(new_student)
        session.commit()
        
        # Refresca la instancia de estudiante para obtener los valores generados por la base de datos
        session.refresh(new_student)
        
        return new_student
    
    except HTTPException as http_exc:
        # En caso de error, realiza un rollback de la transacción
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        # Siempre cierra la sesión
        session.close()


# Update a student
@router.put("/students/{id}", tags=["Students"])
async def update_student(id: int, student: StudentSchema):
    # Crea una única instancia de sesión
    session = SessionLocal()

    try:
        # Recupera el estudiante existente de la base de datos
        existing_student = session.query(StudentModel).filter(StudentModel.Id == id).first()

        # Si el estudiante no existe, devuelve un error 404
        if existing_student is None:
            raise HTTPException(status_code=404, detail="Student not found")

        # Actualiza los campos del estudiante con los valores proporcionados en la solicitud
        existing_student.FirstName = student.FirstName
        existing_student.LastName = student.LastName
        existing_student.DateOfBirth = student.DateOfBirth
        existing_student.Sex = student.Sex

        # Confirma la transacción
        session.commit()

        # Refresca la instancia de estudiante para obtener los valores actualizados de la base de datos
        session.refresh(existing_student)

        return existing_student
    
    except HTTPException as http_exc:
        # En caso de error, realiza un rollback de la transacción
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        # Siempre cierra la sesión
        session.close()


# Delete a student by ID
@router.delete("/students/{id}", tags=["Students"])
async def delete_student(id: int):
    # Crea una única instancia de sesión
    session = SessionLocal()

    try:
        # Recupera el estudiante existente de la base de datos
        existing_student = session.query(StudentModel).filter(StudentModel.Id == id).first()

        # Si el estudiante no existe, devuelve un error 404
        if existing_student is None:
            raise HTTPException(status_code=404, detail="Student not found")

        # Elimina el estudiante de la base de datos
        session.delete(existing_student)

        # Confirma la transacción
        session.commit()

        return {"message": "Student deleted"}
    
    except HTTPException as http_exc:
        # Si se produce un error HTTP, realiza un rollback de la transacción
        session.rollback()
        raise http_exc
    except Exception as e:
         return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        # Siempre cierra la sesión
        session.close()

