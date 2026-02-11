const express = require('express');
const swaggerUi = require('swagger-ui-express');
const InMemoryPatientRepository = require('../adapters/out/InMemoryPatientRepository');
const PatientService = require('../../Application/PatientService');
const createPatientRouter = require('../adapters/in/PatientController');

// Se conectan las capas: repositorio -> servicio -> controlador
const patientRepository = new InMemoryPatientRepository();
const patientService = new PatientService(patientRepository);
const patientRouter = createPatientRouter(patientService);

// Documentacion Swagger para la interfaz /docs
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Servicio de Pacientes',
        description: 'API REST para gestionar pacientes - Arquitectura Hexagonal',
        version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:8001' }],
    paths: {
        '/patients': {
            get: {
                summary: 'Consultar todos los pacientes',
                tags: ['Pacientes'],
                responses: {
                    200: { description: 'Lista de pacientes' }
                }
            },
            post: {
                summary: 'Registrar un paciente',
                tags: ['Pacientes'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nombre', 'email'],
                                properties: {
                                    nombre: { type: 'string', example: 'Juan Perez' },
                                    email: { type: 'string', example: 'juan@mail.com' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Paciente registrado' }
                }
            }
        },
        '/patients/{id}': {
            get: {
                summary: 'Consultar paciente por ID',
                tags: ['Pacientes'],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                ],
                responses: {
                    200: { description: 'Paciente encontrado' },
                    404: { description: 'Paciente no encontrado' }
                }
            },
            delete: {
                summary: 'Eliminar un paciente',
                tags: ['Pacientes'],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                ],
                responses: {
                    200: { description: 'Paciente eliminado' },
                    404: { description: 'Paciente no encontrado' }
                }
            }
        }
    }
};

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/patients', patientRouter);

const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Servicio de Pacientes corriendo en http://localhost:${PORT}`);
    console.log(`Swagger UI en http://localhost:${PORT}/docs`);
});
