import sys, os

# Agregar la raiz del proyecto al path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, ROOT)

import uvicorn
from fastapi import FastAPI
from importlib import import_module

# Importar modulos (se usa importlib porque "in" es palabra reservada en Python)
doctor_repo_mod = import_module("infrastructure.adapters.out.in_memory_doctor_repository")
doctor_svc_mod = import_module("Application.doctor_service")
doctor_ctrl_mod = import_module("infrastructure.adapters.in.doctor_controller")

InMemoryDoctorRepository = doctor_repo_mod.InMemoryDoctorRepository
DoctorService = doctor_svc_mod.DoctorService
create_doctor_router = doctor_ctrl_mod.create_doctor_router

# Se conectan las capas: repositorio -> servicio -> controlador
doctor_repository = InMemoryDoctorRepository()
doctor_service = DoctorService(doctor_repository)
doctor_router = create_doctor_router(doctor_service)

app = FastAPI(title="Servicio de Doctores", description="Examen Taller 6 usando Arquitectura Hexagonal")
app.include_router(doctor_router)

if __name__ == "__main__":
    print("Servicio de Doctores corriendo en http://localhost:8002")
    print("Swagger UI en http://localhost:8002/docs")
    uvicorn.run(app, host="0.0.0.0", port=8002)
