const express = require('express');
const swaggerUi = require('swagger-ui-express');
const InMemoryDoctorRepository = require('../adapters/out/InMemoryDoctorRepository');
const DoctorService = require('../../Application/DoctorService');
const createDoctorRouter = require('../adapters/in/DoctorController');

// Se conectan las capas: repositorio -> servicio -> controlador
const doctorRepository = new InMemoryDoctorRepository();
const doctorService = new DoctorService(doctorRepository);
const doctorRouter = createDoctorRouter(doctorService);

// Documentacion Swagger para la interfaz /docs
const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Servicio de Doctores',
        description: 'API REST para gestionar doctores - Arquitectura Hexagonal',
        version: '1.0.0'
    },
    servers: [{ url: 'http://localhost:8002' }],
    paths: {
        '/doctors': {
            get: {
                summary: 'Consultar todos los doctores',
                tags: ['Doctores'],
                responses: {
                    200: { description: 'Lista de doctores' }
                }
            },
            post: {
                summary: 'Crear un doctor',
                tags: ['Doctores'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['nombre', 'especialidad'],
                                properties: {
                                    nombre: { type: 'string', example: 'Dra. Lopez' },
                                    especialidad: { type: 'string', example: 'Cardiologia' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    201: { description: 'Doctor creado' }
                }
            }
        },
        '/doctors/{id}': {
            get: {
                summary: 'Consultar doctor por ID',
                tags: ['Doctores'],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                ],
                responses: {
                    200: { description: 'Doctor encontrado' },
                    404: { description: 'Doctor no encontrado' }
                }
            },
            delete: {
                summary: 'Eliminar un doctor',
                tags: ['Doctores'],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
                ],
                responses: {
                    200: { description: 'Doctor eliminado' },
                    404: { description: 'Doctor no encontrado' }
                }
            }
        }
    }
};

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/doctors', doctorRouter);

const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Servicio de Doctores corriendo en http://localhost:${PORT}`);
    console.log(`Swagger UI en http://localhost:${PORT}/docs`);
});
