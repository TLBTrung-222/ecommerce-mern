// import all router and attach to app
import UserRouter from './UserRouter'
import OrderRouter from './OrderRouter'
import ProductRouter from './ProductRouter'
import PaymentRouter from './PaymentRouter'
import { Application } from 'express'

/**
 * Configure routes for the app
 * @param app
 */
export default function routesLoader(app: Application) {
    app.use('/api/user', UserRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/payment', PaymentRouter)
}
