import express from "express";
import { getDriveMedia } from "../controllers/media.controller.js";
const router = express.Router();

/* #swagger.tags = [{ name: 'Media', description: 'Gestión y acceso a archivos multimedia' }] */


router.get(
    "/drive/:fileId", 
    /* #swagger.tags = ['Media'] */
    /* #swagger.summary = 'Obtener archivo multimedia desde Google Drive' */
    /* #swagger.description = 'Endpoint para obtener un archivo multimedia específico almacenado en Google Drive mediante su ID.' */
    /* #swagger.parameters['fileId'] = {
        in: 'path', required: true, schema: { type: 'string' }, example: '1A2B3C4D5E6F7G8H9I0J'
        } */
    /* #swagger.responses[200] = {
        description: 'OK',
        content: { 'application/json': { schema: { type: 'string', format: 'binary' } } }
    } */
    /* #swagger.responses[404] = { description: 'Archivo no encontrado' } */
    /* #swagger.responses[500] = { description: 'Error interno' } */
    getDriveMedia
);

export default router;