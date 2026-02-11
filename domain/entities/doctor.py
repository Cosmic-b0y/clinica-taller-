# Entidad de dominio Doctor
class Doctor:
    def __init__(self, id, nombre, especialidad):
        self.id = id
        self.nombre = nombre
        self.especialidad = especialidad

    def to_dict(self):
        return {"id": self.id, "nombre": self.nombre, "especialidad": self.especialidad}
