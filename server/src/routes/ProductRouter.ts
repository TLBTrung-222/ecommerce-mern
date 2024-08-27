import { Router } from 'express'

const ProductRouter = Router()

// config api for this router
ProductRouter.get('/detail/:id')
ProductRouter.get('/get-all')
ProductRouter.get('/product-types')
ProductRouter.post('/create')
ProductRouter.put('/update:id')
ProductRouter.delete('/delete/:id')
ProductRouter.delete('/delete-many')

export default ProductRouter
