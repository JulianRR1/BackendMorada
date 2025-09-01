import express from "express";
import { getAllInformation, getInformationById, createInformation, updateInformation, deleteInformation } from "../controllers/information.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

/* #swagger.tag = [{ name: 'Information', description: 'Informacion de apoyo en temas de violencia'}]*/

/* 
 * GET /information
*/
router.get(
    "/",
    /* #swagger.tags = ['Information'] */
    /* #swagger.summary = 'Obtener toda la información de apoyo' */
    /* #swagger.description = 'Endpoint para obtener toda la información de apoyo disponible.' */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Information' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getAllInformation
);

/*
 * GET /information/{id}
*/
router.get(
    "/:id",
    /* #swagger.tags = ['Information'] */
    /* #swagger.summary = 'Obtener información de apoyo por ID' */
    /* #swagger.description = 'Endpoint para obtener una información de apoyo específica mediante su ID.' */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Information' } } }
    } */
    /* #swagger.responses[404] = { description: 'Información no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getInformationById
);

/*
 * POST /information
*/
router.post(
    "/",
    verifyToken,
    /* #swagger.tags = ['Information'] */
    /* #swagger.summary = 'Crear informacion de apoyo' */
    /* #swagger.description = 'Endpoint para crear una nueva información de apoyo. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Information" } }
        }
     } */
    /* #swagger.responses[201] = {
          description: 'Creado',
          content: { "application/json": { schema: { $ref: "#/components/schemas/Information" } } }
       } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    createInformation
);

/*
 * PUT /information/{id}
*/
router.put(
    "/:id",
    verifyToken,
    /* #swagger.tags = ['Information'] */
    /* #swagger.summary = 'Actualizar información de apoyo existente' */
    /* #swagger.description = 'Endpoint para actualizar una información de apoyo existente por su ID. Requiere autenticación.' */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.requestBody = { 
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Information" } }
        }
     } */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.responses[200] = {
          description: 'OK',
          content: { "application/json": { schema: { $ref: "#/components/schemas/Information" } } }
       } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Información no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    updateInformation
);

/*
 * DELETE /information/{id}
*/
router.delete(
    "/:id", 
    verifyToken, 
    /* #swagger.tags = ['Information'] */
    /* #swagger.summary = 'Eliminar información de apoyo por ID' */
    /* #swagger.description = 'Endpoint para eliminar una información de apoyo específica mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[200] = { description: 'Eliminado correctamente' } */
    /* #swagger.responses[404] = { description: 'Información no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    deleteInformation
);

export default router;