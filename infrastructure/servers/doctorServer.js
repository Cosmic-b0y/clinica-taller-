const express = require('express');
const InMemoryDoctorRepository = require('../adapters/out/InMemoryDoctorRepository');
const DoctorService = require('../../Application/DoctorService');
const createDoctorRouter = require('../adapters/in/DoctorController');

// Se conectan las capas: repositorio -> servicio -> controlador
const doctorRepository = new InMemoryDoctorRepository();
const doctorService = new DoctorService(doctorRepository);
const doctorRouter = createDoctorRouter(doctorService);

const app = express();
app.use(express.json());
app.use('/doctors', doctorRouter);

const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Servicio de Doctores corriendo en http://localhost:${PORT}`);
});
