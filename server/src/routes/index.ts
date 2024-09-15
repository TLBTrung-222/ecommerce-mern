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
    app.use('/api/users', UserRouter)
    app.use('/api/products', ProductRouter)
    app.use('/api/orders', OrderRouter)
    app.use('/api/payments', PaymentRouter)
}
