# Repositorio en memoria para pacientes
class InMemoryPatientRepository:
    def __init__(self):
        self.patients = []

    def save(self, patient):
        self.patients.append(patient)
        return patient

    def find_all(self):
        return self.patients

    def find_by_id(self, id):
        for p in self.patients:
            if p.id == id:
                return p
        return None

    def delete_by_id(self, id):
        for i, p in enumerate(self.patients):
            if p.id == id:
                self.patients.pop(i)
                return True
        return False
