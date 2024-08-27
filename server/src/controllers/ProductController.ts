import * as ProductService from '../services/ProductService'
import { Controller } from '../types'
import { RequestWithId } from '../types/common'
import handleError from '../utils/handleError'

export const getProductDetails: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const product = await ProductService.getProductDetails(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        handleError(error, next)
    }
}
