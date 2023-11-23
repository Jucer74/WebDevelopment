from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from Config.database import SessionLocal
from Models.users import Users
from Models.propertyData import Property
from Schemas.usersSchemas import UsersSchemas
from Schemas.propertyDataSchema import PropertySchema

router = APIRouter()


# Get properti by id
@router.get("/propertie/{id}", tags=["Properties"])
async def get_propertie_by_id(id: int):
    try:
        user = SessionLocal().query(Property).filter(Property.id_inmueble == id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})


# Get user by id
@router.get("/users/{id}", tags=["Users"])
async def get_user_by_id(id: int):
    try:
        user = SessionLocal().query(Users).filter(Users.id_usuario == id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Login
@router.post("/login/{username},{password}", tags=["Users"])
async def login(username: str, password: str):
    session = SessionLocal()
    user = session.query(Users).filter(Users.nombre_usuario == username).first()

    if user is None or password != user.contrasena:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return {"user_id": user.id_usuario}

 #Update account
@router.put("/user/{id}", tags=["Users"])
async def update_account(id: int, user: UsersSchemas):
    session = SessionLocal()

    try:
        existing_user = session.query(Users).filter(Users.id_usuario == id).first()

        if existing_user is None:
            raise HTTPException(status_code=404, detail="User not found")

        existing_user.nombre_usuario = user.nombre_usuario
        existing_user.correo_electronico = user.correo_electronico
        existing_user.contrasena = user.contrasena

        session.commit()
        session.refresh(existing_user)

        return existing_user
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

# Create user
@router.post("/users/create", tags=["Users"])
async def create_user(user: UsersSchemas):
    session = SessionLocal()
    try:
        new_user = Users(
            nombre_usuario=user.nombre_usuario,
            correo_electronico=user.correo_electronico,
            contrasena=user.contrasena,
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return new_user

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

 #Get all propeties
@router.get("/all-propeties", tags=["Propeties"])
async def get_all_propeties():
    try:
        propeties = SessionLocal().query(Property).all()
        return propeties
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

 #Create account
@router.post("/propertie/create", tags=["Properties"])
async def create_propertie(property_data: PropertySchema):
    session = SessionLocal()
    
    try:
        new_propertie = Property(
            precio=property_data.precio,
            num_habitaciones=property_data.num_habitaciones,
            barrio=property_data.barrio,
            metros_cuadrados=property_data.metros_cuadrados,
            num_banos=property_data.num_banos,
            titulo=property_data.titulo,
            creado_por=property_data.creado_por
        )
        
        session.add(new_propertie)
        session.commit()
        session.refresh(new_propertie)
        
        return new_propertie
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()        




# Get properties from user
@router.get("/properties/{id}", tags=["Properties"])
async def get_properties_by_account_id(id: int):
    session = SessionLocal()
    try:
        user = session.query(Users).filter(Users.id_usuario == id).first()
        if user is None:
            raise HTTPException(status_code=404, detail="Property not found")
        properties = session.query(Property).filter(Property.creado_por == id).all()

        return properties
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

# Delete propetie
@router.delete("/Properties/{id}", tags=["Properties"])
async def delete_propertie(id: int):
    session = SessionLocal()

    try:
        existing_propertie = session.query(Property).filter(Property.id_inmueble == id).first()

        if existing_propertie is None:
            raise HTTPException(status_code=404, detail="Propertie not found")

        session.delete(existing_propertie)
        session.commit()

        return {"message": "Propertie deleted"}
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

# Property update
@router.put("/properties/{id}", tags=["Properties"])
async def update_property(id: int, property_data: PropertySchema):
    session = SessionLocal()
    try:
        existing_property = session.query(Property).filter(Property.id_inmueble == id).first()

        if existing_property is None:
            raise HTTPException(status_code=404, detail="Property not found")

        # Update property data with values from the request
        existing_property.precio = property_data.precio
        existing_property.num_habitaciones = property_data.num_habitaciones
        existing_property.barrio= property_data.barrio
        existing_property.metros_cuadrados = property_data.metros_cuadrados
        existing_property.num_banos= property_data.num_banos
        existing_property.titulo = property_data.titulo

        # Add more fields as needed

        session.commit()
        session.refresh(existing_property)

        return existing_property

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()