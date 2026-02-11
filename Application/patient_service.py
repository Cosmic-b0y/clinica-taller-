import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))

from domain.entities.patient import Patient

class PatientService:
    def __init__(self, patient_repository):
        self.patient_repository = patient_repository
        self.current_id = 1

    def register_patient(self, nombre, email):
        patient = Patient(self.current_id, nombre, email)
        self.current_id += 1
        return self.patient_repository.save(patient)

    def get_all_patients(self):
        return self.patient_repository.find_all()

    def get_patient_by_id(self, id):
        return self.patient_repository.find_by_id(id)

    def delete_patient(self, id):
        return self.patient_repository.delete_by_id(id)
