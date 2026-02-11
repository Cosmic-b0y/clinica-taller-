# Controlador REST para pacientes
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

class PatientRequest(BaseModel):
    nombre: str
    email: str

def create_patient_router(patient_service):
    router = APIRouter()

    # POST - para registrar un paciente
    @router.post("/patients", status_code=201)
    def register_patient(data: PatientRequest):
        patient = patient_service.register_patient(data.nombre, data.email)
        return patient.to_dict()

    # GET - para consultar todos los pacientes
    @router.get("/patients")
    def get_all_patients():
        patients = patient_service.get_all_patients()
        return [p.to_dict() for p in patients]

    # GET - consultar paciente por id
    @router.get("/patients/{id}")
    def get_patient_by_id(id: int):
        patient = patient_service.get_patient_by_id(id)
        if not patient:
            raise HTTPException(status_code=404, detail="Paciente no encontrado")
        return patient.to_dict()

    # DELETE - para eliminar un paciente
    @router.delete("/patients/{id}")
    def delete_patient(id: int):
        deleted = patient_service.delete_patient(id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Paciente no encontrado")
        return {"message": "Paciente eliminado correctamente"}

    return router
