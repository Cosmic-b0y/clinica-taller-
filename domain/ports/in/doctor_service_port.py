# Puerto de entrada - define los casos de uso de doctores
from abc import ABC, abstractmethod

class DoctorServicePort(ABC):
    @abstractmethod
    def create_doctor(self, nombre, especialidad):
        pass

    @abstractmethod
    def get_all_doctors(self):
        pass

    @abstractmethod
    def get_doctor_by_id(self, id):
        pass

    @abstractmethod
    def delete_doctor(self, id):
        pass
