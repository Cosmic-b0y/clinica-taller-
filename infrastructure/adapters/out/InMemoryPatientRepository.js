// Repositorio en memoria para pacientes
class InMemoryPatientRepository {
    constructor() {
        this.patients = [];
    }

    save(patient) {
        this.patients.push(patient);
        return patient;
    }

    findAll() {
        return this.patients;
    }

    findById(id) {
        return this.patients.find((p) => p.id === id) || null;
    }

    deleteById(id) {
        const index = this.patients.findIndex((p) => p.id === id);
        if (index === -1) return false;
        this.patients.splice(index, 1);
        return true;
    }
}

module.exports = InMemoryPatientRepository;
