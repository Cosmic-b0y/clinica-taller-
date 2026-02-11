# Repositorio en memoria para doctores
class InMemoryDoctorRepository:
    def __init__(self):
        self.doctors = []

    def save(self, doctor):
        self.doctors.append(doctor)
        return doctor

    def find_all(self):
        return self.doctors

    def find_by_id(self, id):
        for d in self.doctors:
            if d.id == id:
                return d
        return None

    def delete_by_id(self, id):
        for i, d in enumerate(self.doctors):
            if d.id == id:
                self.doctors.pop(i)
                return True
        return False
