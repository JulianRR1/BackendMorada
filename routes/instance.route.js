import express from "express";
import { getAllInstances, getInstanceById, getInformationByStateMunicipality, createInstance, updateInstance, deleteInstance } from "../controllers/instance.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

/* #swagger.tag = [{ name: 'Instance', description: 'Instancias/Organizaciones fisicas de apoyo a muejeres' }] */

/* 
 * GET /instance
*/
router.get(
    "/",
    /* #swagger.tags = ['Instance'] */
    /* #swagger.summary = 'Obtener todas las instancias' */
    /* #swagger.description = 'Endpoint para obtener todas las instancias disponibles.' */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Instance' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getAllInstances
);

/*
 * GET /instance/{id}
*/
router.get(
    "/:id",
    /* #swagger.tags = ['Instance'] */
    /* #swagger.summary = 'Obtener instancia por ID' */
    /* #swagger.description = 'Endpoint para obtener una instancia específica mediante su ID.' */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Instance' } } }
    } */
    /* #swagger.responses[404] = { description: 'Instancia no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getInstanceById
);

/*
 * GET /instance/{state}/{municipality}
*/
router.get(
    "/:state/:municipality",
    /* #swagger.tags = ['Instance'] */
    /* #swagger.summary = 'Obtener instancias por estado y municipio' */
    /* #swagger.description = 'Endpoint para obtener instancias filtradas por estado y municipio.' */
    /* #swagger.parameters['state'] = {
            in: 'path', required: true, schema: { type: 'string' }, example: 'Jalisco'
        } */
    /* #swagger.parameters['municipality'] = {   
            in: 'path', required: true, schema: { type: 'string' }, example: 'Guadalajara'
        } */
    /* #swagger.responses[200] = {
            description: 'OK',
            content: { 'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Instance' } }
            } }
        } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getInformationByStateMunicipality
);

/*
 * POST /instance
*/
router.post(
    "/", 
    verifyToken, 
    /* #swagger.tags = ['Instance'] */
    /* #swagger.summary = 'Crear una nueva instancia' */
    /* #swagger.description = 'Endpoint para crear una nueva instancia. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Instance" } }
        }
     } */
    /* #swagger.responses[201] = {
            description: 'Creado',
            content: { "application/json": { schema: { $ref: "#/components/schemas/Instance" } } }
        } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    createInstance
);

/*
 * PUT /instance/{id}
*/
router.put(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Instance'] */
    /* #swagger.summary = 'Actualizar una instancia por ID' */
    /* #swagger.description = 'Endpoint para actualizar una instancia existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Instance" } }
        }
     } */
    /* #swagger.responses[200] = {
            description: 'OK',
            content: { "application/json": { schema: { $ref: "#/components/schemas/Instance" } } }
        } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Instancia no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    updateInstance);

/*
 * DELETE /instance/{id}
*/
router.delete(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Instance'] */
    /* #swagger.summary = 'Eliminar una instancia por ID' */
    /* #swagger.description = 'Endpoint para eliminar una instancia existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[200] = { description: 'Instancia eliminada exitosamente' } */
    /* #swagger.responses[404] = { description: 'Instancia no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    deleteInstance
);

export default router;
