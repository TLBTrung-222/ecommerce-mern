import ProductModel from '../models/ProductModel'
import { FilterOptions, ProductCreateForm, ProductData, ProductUpdateForm, SortOptions } from '../types'
import { ApiError } from '../utils/ApiError'

export const getProductDetails = async (id: string) => {
    if (!id) throw new ApiError('Id is not valid', 400)

    const product = await ProductModel.findById(id)
    if (!product) throw new ApiError('Product not found', 404)
    return product
}

export const getAllProducts = async (
    limit: string,
    page: string,
    sort: string,
    filter?: string
): Promise<{ products: ProductData[]; countProducts: number; numOfPages: number; currentPageProducts: number }> => {
    // Validate limit and page
    const limitNum = parseInt(limit)
    const pageNum = parseInt(page)
    if (isNaN(limitNum) || isNaN(pageNum) || limitNum <= 0 || pageNum <= 0) {
        throw new ApiError('Invalid limit or page number', 400)
    }

    // Validate sort
    let sortOptions: SortOptions | undefined
    if (sort) {
        let sortField: keyof ProductData = 'created_at' // Default sorting field
        let sortOrder: 'asc' | 'desc' = 'asc' // Default sorting order

        if (typeof sort === 'string') {
            // Assuming sort is a string in the format "field,order"
            const [field, order] = sort.split(',')

            // Validate sort field and order
            if (isValidFields(field) && (order === 'asc' || order === 'desc')) {
                sortField = field as keyof ProductData
                sortOrder = order as 'asc' | 'desc'
            }
        }
        sortOptions = { sortField, sortOrder }
    }

    let filterOptions: FilterOptions | undefined
    if (filter) {
        const [filterField, filterValue] = filter.split(',')
        if (isValidFields(filterField) && filterValue) {
            filterOptions = { filterField: filterField, filterValue }
        } else {
            throw new ApiError('Invalid filter parameter', 400)
        }
    }

    const offset = (pageNum - 1) * limitNum
    const products = await ProductModel.findAll(limitNum, offset, sortOptions, filterOptions)
    const countProducts = await ProductModel.count()
    const numOfPages = Math.ceil(countProducts / limitNum)
    const currentPageProducts = products.length

    return { products, countProducts, numOfPages, currentPageProducts }
}

export const getAllProductTypes = async () => {
    const productTypes = await ProductModel.findTypes()
    return productTypes
}

export const createProduct = async (data: ProductCreateForm) => {
    const { name, image, type, count_in_stock, price, discount } = data
    if (!name || !image || !type || !count_in_stock || !price || !discount) {
        throw new ApiError('Input is required', 400)
    }

    const newProduct = await ProductModel.create(data)
    if (!newProduct) throw new ApiError('Created user unsuccesfully', 500)
    return newProduct
}

/**
 * Get product from db, modify + pass new product to db to update
 * @param productId submitted by client
 * @param data submitted by client
 * @returns updatedProduct
 */
export const updateProduct = async (productId: string, data: ProductUpdateForm) => {
    if (!productId) throw new ApiError('Id is not valid', 400)

    const productToUpdate = await ProductModel.findById(productId)
    if (!productToUpdate) throw new ApiError('Product not founded', 404)

    const updatableFields: Array<keyof ProductUpdateForm> = [
        'name',
        'image',
        'type',
        'price',
        'count_in_stock',
        'description',
        'discount',
        'rating',
        'selled'
    ]
    // validate properties + modify product placeholder
    for (const key of Object.keys(data) as Array<keyof ProductUpdateForm>) {
        // we don't perform validation for now...
        if (updatableFields.includes(key) && data[key]) {
            //@ts-ignore
            productToUpdate[key] = data[key]
        }
    }

    const updatedProduct = await ProductModel.update(productToUpdate)
    return updatedProduct
}

export const deleteProduct = async (productId: string) => {
    if (!productId) throw new ApiError('Id is not valid', 400)
    const product = await ProductModel.delete(productId)

    if (!product) throw new ApiError('No product deleted, check the id', 400)
    return product
}

export const deleteBatch = async (ids: string[]) => {
    if (ids.length === 0) throw new ApiError('No IDs provided for batch delete', 400)

    const products = await ProductModel.deleteBatch(ids)
    if (products.length === 0) throw new ApiError('No product deleted, check the IDs', 400)
    return products
}

// ------------------------ Helper function ---------------------------------

const isValidFields = (field: string): field is keyof ProductData => {
    const productFields: Array<keyof ProductData> = [
        'id',
        'name',
        'image',
        'type',
        'price',
        'count_in_stock',
        'rating',
        'description',
        'discount',
        'selled',
        'created_at',
        'updated_at'
    ]

    return productFields.includes(field as keyof ProductData)
}
