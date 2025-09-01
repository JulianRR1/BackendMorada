import express from "express";
import { getAllResponses, getResponseById, createResponse, updateResponse, deleteResponse } from "../controllers/response.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

/* #swagger.tags = [{ name: 'Response', description: 'Manejo de respuestas y seguimientos de casos' }] */

/* 
 * GET /response
*/
router.get(
    "/", 
    /* #swagger.tags = ['Response'] */
    /* #swagger.summary = 'Obtener todas las respuestas' */
    /* #swagger.description = 'Endpoint para obtener todas las respuestas disponibles.' */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Response' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getAllResponses
);

/*
 * GET /response/{id}
*/
router.get(
    "/:id", 
    /* #swagger.tags = ['Response'] */
    /* #swagger.summary = 'Obtener respuesta por ID' */
    /* #swagger.description = 'Endpoint para obtener una respuesta específica mediante su ID.' */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Response' } } }
    } */
    /* #swagger.responses[404] = { description: 'Respuesta no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getResponseById
);

/*
 * POST /response
*/
router.post(
    "/", 
    verifyToken,
    /* #swagger.tags = ['Response'] */
    /* #swagger.summary = 'Crear una nueva respuesta' */
    /* #swagger.description = 'Endpoint para crear una nueva respuesta. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Response" } }
        }
     } */
    /* #swagger.responses[201] = {
        description: 'Respuesta creada',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Response' } } }
    } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[401] = { description: 'No autorizado' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */ 
    createResponse
);

/*
 * PUT /response/{id}
*/
router.put(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Response'] */
    /* #swagger.summary = 'Actualizar una respuesta existente' */
    /* #swagger.description = 'Endpoint para actualizar una respuesta existente por su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
     } */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Response" } }
        }
     } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { "application/json": { schema: { $ref: "#/components/schemas/Response" } } }
    } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Respuesta no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    updateResponse
);

/*
 * DELETE /response/{id}
*/
router.delete(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Response'] */
    /* #swagger.summary = 'Eliminar una respuesta por ID' */
    /* #swagger.description = 'Endpoint para eliminar una respuesta existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Respuesta no encontrada' } */
    /* #swagger.responses[401] = { description: 'No autorizado' } */
    /* #swagger.responses[403] = { description: 'Prohibido' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    deleteResponse
);

export default router;