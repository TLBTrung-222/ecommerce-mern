import * as ProductService from '../services/ProductService'
import {
    Controller,
    ApiResponse,
    RequestWithId,
    ProductUpdateForm,
    ProductCreateForm,
    ProductData,
    SortOptions
} from '../types'
import { ApiError } from '../utils/ApiError'
import handleError from '../utils/handleError'

export const getProductDetails: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const product = await ProductService.getProductDetails(req.params.id)

        const response: ApiResponse = { success: true, message: 'Get product succesfully', data: { product } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const getAllProducts: Controller = async (req, res, next) => {
    try {
        const { limit = '6', page = '1', sort, filter } = req.query

        const { products, countProducts, numOfPages, currentPageProducts } = await ProductService.getAllProducts(
            limit as string,
            page as string,
            sort as string,
            filter as string
        )

        const response: ApiResponse = {
            success: true,
            message: 'Get products successfully',
            data: {
                numOfProducts: countProducts,
                numOfPages,
                currentPage: Number(page),
                currentPageProducts,
                products: products
            }
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const getAllProductTypes: Controller = async (req, res, next) => {
    try {
        const productTypes = await ProductService.getAllProductTypes()
        const response: ApiResponse = {
            success: true,
            message: 'Get all product types succesfully',
            data: { productTypes }
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const createProduct: Controller = async (req, res, next) => {
    try {
        const data: ProductCreateForm = req.body
        const newProduct = await ProductService.createProduct(data)
        const response: ApiResponse = {
            success: true,
            message: 'Created new product succesfully',
            data: { newProduct }
        }
        res.status(201).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const updateProduct: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const data: ProductUpdateForm = req.body

        const updatedProduct = await ProductService.updateProduct(req.params.id, data)
        const response: ApiResponse = { success: true, message: 'Update user succesfuly', data: { updatedProduct } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const deleteProduct: Controller<RequestWithId> = async (req, res, next) => {
    try {
        const product = await ProductService.deleteProduct(req.params.id)

        const response: ApiResponse = { success: true, message: 'Delete product succesfully', data: { product } }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}

export const deleteBatchProducts: Controller = async (req, res, next) => {
    try {
        const ids = req.body.ids

        if (!ids || !Array.isArray(ids)) throw new ApiError('No IDs provided for batch delete', 400)

        if (!ids.every((id) => typeof id === 'string')) throw new ApiError('IDs contains non-string value', 400)
        const products = await ProductService.deleteBatch(ids)
        const response: ApiResponse = {
            success: true,
            message: 'Deleted batch product succesfully',
            data: { products }
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(error, next)
    }
}
