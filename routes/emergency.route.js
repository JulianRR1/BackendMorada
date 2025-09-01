import express from "express";
import { getAllEmergency, getByEstadoMunicipio, createEmergency, updateEmergency, deleteEmergency } from "../controllers/emergency.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

/* #swagger.tags = [{ name: 'Emergency', description: 'Directorio de líneas de emergencia por estado y municipio' }] */

/**
 * GET /emergency
 */
router.get(
    "/",
    /* #swagger.tags = ['Emergency'] */
    /* #swagger.summary = 'Obtener todas las líneas de emergencia' */
    /* #swagger.description = 'Endpoint para obtener todas las líneas de emergencia disponibles.' */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Emergency' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getAllEmergency
);

/**
 * GET /emergency/{state}/{municipality}
*/
router.get(
    "/:state/:municipality",
    /* #swagger.tags = ['Emergency'] */
    /* #swagger.summary = 'Obtener líneas de emergencia por estado y municipio' */
    /* #swagger.description = 'Endpoint para obtener líneas de emergencia filtradas por estado y municipio.' */
    /* #swagger.parameters['state'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: 'Jalisco'
     } */
    /* #swagger.parameters['municipality'] = {
          in: 'path', required: true, schema: { type: 'string' }, example: 'Guadalajara'
       } */
    /* #swagger.responses[200] = {
          description: 'OK',
          content: { 'application/json': {
            schema: { type: 'array', items: { $ref: '#/components/schemas/Emergency' } }
          } }
       } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getByEstadoMunicipio
);

/*
 * POST /emergency
*/
router.post(
    "/",
    verifyToken,
    /* #swagger.tags = ['Emergency'] */
    /* #swagger.summary = 'Crear una nueva línea de emergencia' */
    /* #swagger.description = 'Endpoint para crear una nueva línea de emergencia. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Emergency" } }
        }
     } */
    /* #swagger.responses[201] = {
            description: 'Creado',
            content: { "application/json": { schema: { $ref: "#/components/schemas/Emergency" } } }
            } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[401] = { description: 'No autorizado' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    createEmergency
);

/*
 * PUT /emergency/{id}
*/
router.put(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Emergency'] */
    /* #swagger.summary = 'Actualizar una línea de emergencia existente' */
    /* #swagger.description = 'Endpoint para actualizar una línea de emergencia existente por su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64a7f0c8e4b0c2a1b2c3d4e5'
     } */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Emergency" } }
        }
     } */
    /* #swagger.responses[200] = {
            description: 'OK',
            content: { "application/json": { schema: { $ref: "#/components/schemas/Emergency" } } }
            } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[401] = { description: 'No autorizado' } */
    /* #swagger.responses[404] = { description: 'No encontrado' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    updateEmergency
);

/* 
 * DELETE /emergency/{id}
*/
router.delete(
    "/:id", 
    verifyToken, 
    /* #swagger.tags = ['Emergency'] */
    /* #swagger.summary = 'Eliminar una línea de emergencia' */
    /* #swagger.description = 'Endpoint para eliminar una línea de emergencia por su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64a7f0c8e4b0c2a1b2c3d4e5'
     } */
    /* #swagger.responses[200] = { description: 'Eliminado correctamente' } */
    /* #swagger.responses[401] = { description: 'No autorizado' } */
    /* #swagger.responses[404] = { description: 'No encontrado' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    deleteEmergency
);

export default router;