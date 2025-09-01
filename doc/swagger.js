import swaggerAutogen from 'swagger-autogen';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputFile = path.resolve(__dirname, "./swagger.json"); // ✅ doc/swagger.json
const endpointsFiles = [
    path.resolve(__dirname, '../app.js'),
    /*path.resolve(__dirname, "../routes/auth.routes.js"),
    path.resolve(__dirname, "../routes/emergency.route.js"),
    path.resolve(__dirname, "../routes/information.route.js"),
    path.resolve(__dirname, "../routes/instance.route.js"),
    path.resolve(__dirname, "../routes/line.route.js"),
    path.resolve(__dirname, "../routes/media.routes.js"),
    path.resolve(__dirname, "../routes/response.route.js"),
    path.resolve(__dirname, "../routes/survey.route.js"),*/
];

/*const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/auth.routes.js',
    './routes/emergency.route.js',
    './routes/information.route.js',
    './routes/instance.route.js',
    './routes/line.route.js',
    './routes/media.routes.js',
    './routes/response.route.js',
    './routes/survey.route.js'
];*/

const doc = {
    info: {
        version: '1.0.0',
        title: 'App Morada API',
        description: 'API para contenido informativo, emergencias y streaming de medios vía proxy.\n' +
            '• /information devuelve URLs proxied.\n' +
            '• /media/drive/{fileId} sirve el binario desde Drive.',
    },
    servers: [
        { url: 'http://localhost:3000', description: 'Dev' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        },
        schemas: {
            Emergency: {
                number: "911",
                state: "Jalisco",
                municipality: "Guadalajara",
                emergencyType: "apoyo policial"
            },
            Information: {
                tittle: "Preparación para sismos",
                description: [
                    {
                        subtitle: "Antes de un sismo",
                        information: "Identifica lugares seguros en cada habitación de tu casa.",
                        imageUrl: "https://example.com/image1.jpg",
                        imageAlt: "Lugar seguro en casa",
                        videoUrl: "https://example.com/video1.mp4",
                        videoAlt: "Video sobre preparación para sismos"
                    },
                    {
                        subtitle: "Durante un sismo",
                        information: "Agáchate, cúbrete y sujétate.",
                        imageUrl: "https://example.com/image2.jpg",
                        imageAlt: "Persona agachada durante un sismo",
                        videoUrl: "https://example.com/video2.mp4",
                        videoAlt: "Video sobre qué hacer durante un sismo"
                    }
                ],
                fileUrl: "https://example.com/guide.pdf",
                fileAlt: "Guía completa de preparación para sismos",
                imageUrl: "https://example.com/cover.jpg",
                imageAlt: "Portada de la guía de preparación para sismos"
            },
            Instance: {
                name: "Centro de Atención",
                contact: {
                    tel: "+52 33 1234 5678",
                    email: "example@gmail.com",
                    address: "Calle Falsa 123, Ciudad, Estado"
                },
                hours: "Lunes a Viernes, 9am - 6pm",
                type: "atencion a la violencia",
                services: [
                    "Asesoría legal",
                    "Apoyo psicológico",
                    "Refugio temporal"
                ],
                state: "Jalisco",
                municipality: "Guadalajara"
            },
            LineLSM: {
                number: "1234567890",
                name: "Línea de ayuda"
            },
            Response: {
                phase: "antes",
                response: "Mantén la calma y sigue las instrucciones de las autoridades.",
                level: "alta",
                type: "accion",
                videoUrl: "https://www.youtube.com/watch?v=example",
                videoAlt: "Video instructivo sobre qué hacer antes de un sismo."
            },
            Survey: {
                part: "parte1",
                phase: "antes",
                question: "¿Sabes qué hacer en caso de un sismo?",
                videoUrl: "https://www.youtube.com/watch?v=example",
                videoAlt: "Video sobre preparación para sismos."
            },
            User: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Juan Pérez' },
                    email: { type: 'string', example: 'example@gmai.com' },
                    password: { type: 'string', example: 'strongpassword123' },
                    role: { type: 'string', enum: ['ADMIN', 'USER'], example: 'USER' },
                },
                required: ['name', 'email', 'password', 'role'],
            },
            AuthLoginRequest: { email: "admin@morada.app", password: "StrongPassword123!" },
            AuthLoginResponse: { token: "eyJhbGciOi..." },
            RegisterUserRequest: { name: "Julian", email: "user@morada.app", password: "StrongPassword123!", role: "USER" },
            RegisterUserResponse: { message: "Usuario registrado correctamente." }
        },
    },
};



swaggerAutogen({ openapi: '3.0.3' })(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully.');
});