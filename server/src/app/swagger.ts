import { Application, Request, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerDefinition } from '../docs/swaggerDef'

// 1. create swagger specification with swaggerJsDoc
// (it will convert swagger comment on apis to result in a fully spec)
// 2. Serve this spec to swagger-ui-express to create an api route for the docs

const options: swaggerJSDoc.OAS3Options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['src/routes/*.ts', 'src/docs/*.yml'] // looks for configuration in specified directories
}

// Returns validated Swagger specification in JSON format.
const swaggerSpec = swaggerJSDoc(options)

/**
 * Configures swagger spec (both UI + plain json file)
 * @param app
 */
export default function swaggerLoader(app: Application) {
    // server the spec in json format (to read the source)
    app.get('/swagger.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    // server spec (rendered)
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
