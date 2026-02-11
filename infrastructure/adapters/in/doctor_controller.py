# Controlador REST para doctores
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

class DoctorRequest(BaseModel):
    nombre: str
    especialidad: str

def create_doctor_router(doctor_service):
    router = APIRouter()

    # POST - para crear un doctor
    @router.post("/doctors", status_code=201)
    def create_doctor(data: DoctorRequest):
        doctor = doctor_service.create_doctor(data.nombre, data.especialidad)
        return doctor.to_dict()

    # GET - para consultar todos los doctores
    @router.get("/doctors")
    def get_all_doctors():
        doctors = doctor_service.get_all_doctors()
        return [d.to_dict() for d in doctors]

    # GET - consultar doctor por id
    @router.get("/doctors/{id}")
    def get_doctor_by_id(id: int):
        doctor = doctor_service.get_doctor_by_id(id)
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor no encontrado")
        return doctor.to_dict()

    # DELETE - para eliminar un doctor
    @router.delete("/doctors/{id}")
    def delete_doctor(id: int):
        deleted = doctor_service.delete_doctor(id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Doctor no encontrado")
        return {"message": "Doctor eliminado correctamente"}

    return router
