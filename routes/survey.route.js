import express from "express";
import { getAllSurveys, getSurveyById, getSurveyByPartPhase, createSurvey, updateSurvey, deleteSurvey } from "../controllers/survey.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js"; // Ensure to import the verifyToken middleware

/* #swagger.tags = [{ name: 'Survey', description: 'Gestión de encuestas y recopilación de datos' }] */

/* 
 * GET /survey
*/
router.get(
    "/",
    /* #swagger.tags = ['Survey'] */
    /* #swagger.summary = 'Obtener todas las encuestas' */
    /* #swagger.description = 'Endpoint para obtener todas las encuestas disponibles.' */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Survey' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */ 
    getAllSurveys
);

/*
 * GET /survey/{part}/{phase}
*/
router.get(
    "/:part/:phase", 
    /* #swagger.tags = ['Survey'] */
    /* #swagger.summary = 'Obtener encuestas por parte y fase' */
    /* #swagger.description = 'Endpoint para obtener encuestas filtradas por parte y fase.' */
    /* #swagger.parameters['part'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: 'A'
        } */
    /* #swagger.parameters['phase'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '1'
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Survey' } }
        } }
     } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getSurveyByPartPhase
);

/*
 * GET /survey/{id}
*/
router.get(
    "/:id",
    /* #swagger.tags = ['Survey'] */
    /* #swagger.summary = 'Obtener encuesta por ID' */
    /* #swagger.description = 'Endpoint para obtener una encuesta específica mediante su ID.' */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Survey' } } }
    } */
    /* #swagger.responses[404] = { description: 'Encuesta no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */ 
    getSurveyById
); // Assuming you want to add this route

/*
 * POST /survey
*/
router.post(
    "/", 
    verifyToken, 
    /* #swagger.tags = ['Survey'] */
    /* #swagger.summary = 'Crear una nueva encuesta' */
    /* #swagger.description = 'Endpoint para crear una nueva encuesta. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/Survey" } }
        }
     } */
    /* #swagger.responses[201] = {
        description: 'Creado',
        content: { "application/json": { schema: { $ref: "#/components/schemas/CreateSurveyResponse" } } }
     } */
    /* #swagger.responses[400] = { description: 'Solicitud incorrecta' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    createSurvey
);

/*
 * PUT /survey/{id}
*/
router.put(
    "/:id", 
    verifyToken, 
    /* #swagger.tags = ['Survey'] */
    /* #swagger.summary = 'Actualizar encuesta por ID' */
    /* #swagger.description = 'Endpoint para actualizar una encuesta existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": { schema: { $ref: "#/components/schemas/Survey" } }
        }
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { "application/json": { schema: { $ref: "#/components/schemas/Survey" } } }
     } */
    /* #swagger.responses[400] = { description: 'Solicitud inválida' } */
    /* #swagger.responses[404] = { description: 'Encuesta no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    updateSurvey
);

/*
 * DELETE /survey/{id}
*/
router.delete(
    "/:id", 
    verifyToken,
    /* #swagger.tags = ['Survey'] */
    /* #swagger.summary = 'Eliminar encuesta por ID' */
    /* #swagger.description = 'Endpoint para eliminar una encuesta existente mediante su ID. Requiere autenticación.' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    /* #swagger.parameters['id'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '64b8f0f5e1b2c3d4e5f67890'
        } */
    /* #swagger.responses[204] = { description: 'No Content' } */
    /* #swagger.responses[404] = { description: 'Encuesta no encontrada' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */ 
    deleteSurvey
);

export default router;