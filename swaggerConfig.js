// swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from './config';

const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Social App Project',
            version: '5.0.0',
            contact: {
                name: 'Harsh Sharma',
                email: 'harshtestserver@gmail.com',
                url: 'https://www.linkedin.com/in/hs19991215/',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}/`,
            },
        ],
        securityDefinitions: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
            },
        },
    },
    apis: ['./index.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
