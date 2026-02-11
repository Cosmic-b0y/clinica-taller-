// Repositorio en memoria para doctores
class InMemoryDoctorRepository {
    constructor() {
        this.doctors = [];
    }

    save(doctor) {
        this.doctors.push(doctor);
        return doctor;
    }

    findAll() {
        return this.doctors;
    }

    findById(id) {
        return this.doctors.find((d) => d.id === id) || null;
    }

    deleteById(id) {
        const index = this.doctors.findIndex((d) => d.id === id);
        if (index === -1) return false;
        this.doctors.splice(index, 1);
        return true;
    }
}

module.exports = InMemoryDoctorRepository;
