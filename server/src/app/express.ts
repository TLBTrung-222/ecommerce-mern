import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const allowedOrigins = ['http://localhost:5173', 'https://ecommerce-mern-khaki.vercel.app']

/**
 * Configures middleware for the Express application.
 * @param app - The Express application instance to configure.
 */
const expressLoader = (app: Application) => {
    // accept cors from any origin

    app.use(
        cors({
            origin: function (origin, callback) {
                console.log('Origin:', origin) // Log the origin of each request
                // Allow requests with no origin (like mobile apps or curl requests)
                if (!origin) return callback(null, true)
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg = 'The CORS policy for this site does not allow access from the specified Origin.'
                    return callback(new Error(msg), false)
                }
                return callback(null, true)
            },
            credentials: true
        })
    )

    // parse json request body
    app.use(express.json({ limit: '50mb' }))

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))

    // parse cookie
    app.use(cookieParser())
}

export default expressLoader
