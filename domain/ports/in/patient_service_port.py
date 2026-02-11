# Puerto de entrada - define los casos de uso de pacientes
from abc import ABC, abstractmethod

class PatientServicePort(ABC):
    @abstractmethod
    def register_patient(self, nombre, email):
        pass

    @abstractmethod
    def get_all_patients(self):
        pass

    @abstractmethod
    def get_patient_by_id(self, id):
        pass

    @abstractmethod
    def delete_patient(self, id):
        pass
