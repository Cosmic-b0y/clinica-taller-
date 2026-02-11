# Puerto de salida - define las operaciones del repositorio de pacientes
from abc import ABC, abstractmethod

class PatientRepositoryPort(ABC):
    @abstractmethod
    def save(self, patient):
        pass

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_id(self, id):
        pass

    @abstractmethod
    def delete_by_id(self, id):
        pass
