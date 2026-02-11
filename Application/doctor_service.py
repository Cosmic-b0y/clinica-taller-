import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from domain.entities.doctor import Doctor

class DoctorService:
    def __init__(self, doctor_repository):
        self.doctor_repository = doctor_repository
        self.current_id = 1

    def create_doctor(self, nombre, especialidad):
        doctor = Doctor(self.current_id, nombre, especialidad)
        self.current_id += 1
        return self.doctor_repository.save(doctor)

    def get_all_doctors(self):
        return self.doctor_repository.find_all()

    def get_doctor_by_id(self, id):
        return self.doctor_repository.find_by_id(id)

    def delete_doctor(self, id):
        return self.doctor_repository.delete_by_id(id)
