const express = require('express');
const InMemoryPatientRepository = require('../adapters/out/InMemoryPatientRepository');
const PatientService = require('../../Application/PatientService');
const createPatientRouter = require('../adapters/in/PatientController');

// Se conectan las capas: repositorio -> servicio -> controlador
const patientRepository = new InMemoryPatientRepository();
const patientService = new PatientService(patientRepository);
const patientRouter = createPatientRouter(patientService);

const app = express();
app.use(express.json());
app.use('/patients', patientRouter);

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Servicio de Pacientes corriendo en http://localhost:${PORT}`);
});
