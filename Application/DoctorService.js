const Doctor = require('../domain/entities/Doctor');

class DoctorService {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.currentId = 1;
    }

    createDoctor(nombre, especialidad) {
        const doctor = new Doctor(this.currentId++, nombre, especialidad);
        return this.doctorRepository.save(doctor);
    }

    getAllDoctors() {
        return this.doctorRepository.findAll();
    }

    getDoctorById(id) {
        return this.doctorRepository.findById(id);
    }

    deleteDoctor(id) {
        return this.doctorRepository.deleteById(id);
    }
}

module.exports = DoctorService;
