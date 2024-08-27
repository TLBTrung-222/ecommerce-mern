import express, { Application } from 'express'
import cookieParser from 'cookie-parser'

/**
 * Configures middleware for the Express application.
 * @param app - The Express application instance to configure.
 */
const expressLoader = (app: Application) => {
    // parse json request body
    app.use(express.json())

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }))

    // parse cookie
    app.use(cookieParser())
}

export default expressLoader
