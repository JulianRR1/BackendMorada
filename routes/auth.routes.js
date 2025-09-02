import express from "express";
import { loginAdmin, registerUser } from "../controllers/auth.controller.js";
const router = express.Router();

/* #swagger.tags = [{ name: 'Auth', description: 'Autenticación y registro dentro del dashboard ADMIN' }] */
/* #swagger.path = '/auth' */

router.post(
    "/admin/login",
    /* #swagger.tags = ['Auth'] */
    /* #swagger.summary = 'Iniciar sesión como administrador' */
    /* #swagger.description = 'Endpoint para que los administradores inicien sesión y obtengan un token JWT.' */
    /* #swagger.requestBody = {
       required: true,
       content: {
         "application/json": { schema: { $ref: "#/components/schemas/AuthLoginRequest" } }
       }
    } */
    /* #swagger.responses[200] = {
          description: 'OK',
          content: { "application/json": { schema: { $ref: "#/components/schemas/AuthLoginResponse" } } }
       } */
    /* #swagger.responses[401] = { description: 'Usuario no autorizado o credenciales inválidas' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    loginAdmin
);
router.post(
    "/register",
    /* #swagger.tags = ['Auth'] */
    /* #swagger.summary = 'Registrar un nuevo usuario' */
    /* #swagger.description = 'Endpoint para registrar un nuevo usuario con rol USER o ADMIN.' */
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": { schema: { $ref: "#/components/schemas/RegisterUserRequest" } }
        }
     } */
    /* #swagger.responses[201] = {
          description: 'Creado',
          content: { "application/json": { schema: { $ref: "#/components/schemas/RegisterUserResponse" } } }
       } */
    /* #swagger.responses[400] = { description: 'Correo ya registrado' } */
    /* #swagger.responses[409] = { description: 'Duplicado (si lo manejas con 409)' } */
    /* #swagger.responses[500] = { description: 'Error en el servidor' } */
    registerUser
);

export default router;