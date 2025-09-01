import express from "express";
import { getAllLines, getByName, createLine, updateLine, deleteLine } from "../controllers/line.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

/* #swagger.tags = [{ name: 'LineLSM', description: 'Directorio de líneas de apoyo por estado y municipio' }] */

/**
 * GET /line
*/
router.get(
    "/", 
    /* #swagger.tags = ['Line'] */
    /* #swagger.summary = 'Obtener todas las líneas de apoyo' */
    /* #swagger.description = 'Endpoint para obtener todas las líneas de apoyo disponibles.' */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/LineLSM' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getAllLines
);

/*
    * GET /line/{name}
*/
router.get(
    "/:name",
    /* #swagger.tags = ['Line'] */
    /* #swagger.summary = 'Obtener línea de apoyo por nombre' */
    /* #swagger.description = 'Endpoint para obtener una línea de apoyo específica mediante su nombre.' */
    /* #swagger.parameters['name'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: 'Línea Nacional contra la Violencia Familiar y Sexual'
        } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/LineLSM' } } }
    } */
    /* #swagger.responses[404] = { description: 'Línea no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */ 
    getByName
);

/*
 * POST /line
*/
router.post(
    "/", 
    verifyToken,
    /* #swagger.tags = ['Line'] */
    /* #swagger.summary = 'Crear una nueva línea de apoyo' */
    /* #swagger.description = 'Endpoint para crear una nueva línea de apoyo. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/LineLSM" } }
        }
     } */
    /* #swagger.responses[201] = {
        description: 'Creado',
        content: { "application/json": { schema: { $ref: "#/components/schemas/LineLSM" } } }
     } */
    /* #swagger.responses[400] = { description: 'Solicitud incorrecta' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */ 
    createLine
);

/* 
 * PUT /line/{id}
*/
router.put(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Line'] */
    /* #swagger.summary = 'Actualizar línea de apoyo por ID' */
    /* #swagger.description = 'Endpoint para actualizar una línea de apoyo existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/LineLSM" } }
        }
     } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { "application/json": { schema: { $ref: "#/components/schemas/LineLSM" } } }
     } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Línea no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    updateLine
);

/*
 * DELETE /line/{id}
*/
router.delete(
    "/:id", 
    verifyToken, 
    /* #swagger.tags = ['Line'] */
    /* #swagger.summary = 'Eliminar línea de apoyo por ID' */
    /* #swagger.description = 'Endpoint para eliminar una línea de apoyo existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Línea no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    deleteLine
);

export default router;