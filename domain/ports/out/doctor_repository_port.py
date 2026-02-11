# Puerto de salida - define las operaciones del repositorio de doctores
from abc import ABC, abstractmethod

class DoctorRepositoryPort(ABC):
    @abstractmethod
    def save(self, doctor):
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
