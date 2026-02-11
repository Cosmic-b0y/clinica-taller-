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
}

module.exports = InMemoryPatientRepository;
