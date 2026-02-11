import sys, os

# Agregar la raiz del proyecto al path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, ROOT)

import uvicorn
from fastapi import FastAPI
from importlib import import_module

# Importar modulos (se usa importlib porque "in" es palabra reservada en Python)
patient_repo_mod = import_module("infrastructure.adapters.out.in_memory_patient_repository")
patient_svc_mod = import_module("Application.patient_service")
patient_ctrl_mod = import_module("infrastructure.adapters.in.patient_controller")

InMemoryPatientRepository = patient_repo_mod.InMemoryPatientRepository
PatientService = patient_svc_mod.PatientService
create_patient_router = patient_ctrl_mod.create_patient_router

# Se conectan las capas: repositorio -> servicio -> controlador
patient_repository = InMemoryPatientRepository()
patient_service = PatientService(patient_repository)
patient_router = create_patient_router(patient_service)

app = FastAPI(title="Servicio de Pacientes", description="Examen Taller 6 usando Arquitectura Hexagonal")
app.include_router(patient_router)

if __name__ == "__main__":
    print("Servicio de Pacientes corriendo en http://localhost:8001")
    print("Swagger UI en http://localhost:8001/docs")
    uvicorn.run(app, host="0.0.0.0", port=8001)
