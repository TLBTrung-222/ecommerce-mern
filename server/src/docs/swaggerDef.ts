import swaggerJSDoc from 'swagger-jsdoc'
import { version } from '../../package.json'

// define base spec
export const swaggerDefinition: swaggerJSDoc.OAS3Definition = {
    openapi: '3.0.0',
    info: {
        title: 'E-commerce User API',
        version,
        description: ' API doc for the PERN stack e-commerce application'
    },

    servers: [{ url: 'http://localhost:3001/', description: 'local server' }]
}
