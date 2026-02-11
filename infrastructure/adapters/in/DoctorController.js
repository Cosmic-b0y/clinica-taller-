// Controlador REST para doctores
const express = require('express');

function createDoctorRouter(doctorService) {
    const router = express.Router();

    // POST - crear un doctor
    router.post('/', (req, res) => {
        const { nombre, especialidad } = req.body;
        if (!nombre || !especialidad) {
            return res.status(400).json({ error: 'nombre y especialidad son obligatorios' });
        }
        const doctor = doctorService.createDoctor(nombre, especialidad);
        res.status(201).json(doctor);
    });

    // GET - consultar todos los doctores
    router.get('/', (req, res) => {
        const doctors = doctorService.getAllDoctors();
        res.json(doctors);
    });

    // GET - consultar doctor por id
    router.get('/:id', (req, res) => {
        const doctor = doctorService.getDoctorById(Number(req.params.id));
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor no encontrado' });
        }
        res.json(doctor);
    });

    // DELETE - eliminar un doctor
    router.delete('/:id', (req, res) => {
        const deleted = doctorService.deleteDoctor(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: 'Doctor no encontrado' });
        }
        res.json({ message: 'Doctor eliminado correctamente' });
    });

    return router;
}

module.exports = createDoctorRouter;
