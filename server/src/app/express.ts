import express, { Application } from 'express'

/**
 * Configures middleware for the Express application.
 * @param app - The Express application instance to configure.
 */
const expressLoader = (app: Application) => {
    // parse json request body
    app.use(express.json())

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }))
}

export default expressLoader
