// expost an Express app instance (intgrate route, swagger, ...)
import express, { Application } from 'express'
const app: Application = express()
import expressLoader from './express'
import swaggerLoader from './swagger'
import routesLoader from '../routes'
import errorHandler from '../middlewares/errorMiddleware'

/**
 * Load middleware, route, etc... to the app instance
 */
const loadApp = () => {
    expressLoader(app)
    swaggerLoader(app)
    routesLoader(app)

    app.use(errorHandler)
}

loadApp()

export default app
