const Patient = require('../domain/entities/Patient');

class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
        this.currentId = 1;
    }

    registerPatient(nombre, email) {
        const patient = new Patient(this.currentId++, nombre, email);
        return this.patientRepository.save(patient);
    }

    getAllPatients() {
        return this.patientRepository.findAll();
    }

    getPatientById(id) {
        return this.patientRepository.findById(id);
    }

    deletePatient(id) {
        return this.patientRepository.deleteById(id);
    }
}

module.exports = PatientService;
