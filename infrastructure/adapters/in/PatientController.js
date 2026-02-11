// Controlador REST para pacientes
const express = require('express');

function createPatientRouter(patientService) {
    const router = express.Router();

    // POST - registrar un paciente
    router.post('/', (req, res) => {
        const { nombre, email } = req.body;
        if (!nombre || !email) {
            return res.status(400).json({ error: 'nombre y email son obligatorios' });
        }
        const patient = patientService.registerPatient(nombre, email);
        res.status(201).json(patient);
    });

    // GET - consultar todos los pacientes
    router.get('/', (req, res) => {
        const patients = patientService.getAllPatients();
        res.json(patients);
    });

    // GET - consultar paciente por id
    router.get('/:id', (req, res) => {
        const patient = patientService.getPatientById(Number(req.params.id));
        if (!patient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }
        res.json(patient);
    });

    return router;
}

module.exports = createPatientRouter;
