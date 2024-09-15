import { Router } from 'express'
import * as ProductController from '../controllers/ProductController'
import { adminAuth, userAuth } from '../middlewares/authMiddleware'

const ProductRouter = Router()

//---------------------------------------- Resource routes ------------------------------------------------------------
ProductRouter.get('/types', ProductController.getAllProductTypes)
ProductRouter.get('/:id', ProductController.getProductDetails)
ProductRouter.get('/', ProductController.getAllProducts)

//---------------------------------------- Admin only routes ------------------------------------------------------------
ProductRouter.post('/', adminAuth, ProductController.createProduct)
ProductRouter.delete('/batch', adminAuth, ProductController.deleteBatchProducts)
ProductRouter.put('/:id', adminAuth, ProductController.updateProduct)
ProductRouter.delete('/:id', adminAuth, ProductController.deleteProduct)

export default ProductRouter
