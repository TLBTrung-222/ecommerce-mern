import { Router } from 'express'
import * as ProductController from '../controllers/ProductController'

const ProductRouter = Router()

// config api for this router
ProductRouter.get('/:id', ProductController.getProductDetails)
ProductRouter.get('/')
ProductRouter.get('/types')
ProductRouter.post('/')
ProductRouter.put('/:id')
ProductRouter.delete('/:id')
ProductRouter.delete('/batch-delete')

export default ProductRouter
