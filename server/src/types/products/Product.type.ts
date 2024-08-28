/**
 * Represent a product row in database
 */
export interface ProductData {
    id: number
    name: string
    image: string
    type: string
    price: number
    count_in_stock: number
    rating: number
    description?: string
    discount?: number
    selled?: number
    created_at?: Date
    updated_at?: Date
}

/**
 * Represent a form submitted to create product
 */
export interface ProductCreateForm {
    name?: string
    image?: string
    type?: string
    price?: number
    count_in_stock?: number
    description?: string
    discount?: number
}

/**
 * Represent a form submitted to update product (all properties is optional)
 */
export type ProductUpdateForm = Partial<ProductCreateForm> & {
    rating?: number
    selled?: number
}

export interface SortOptions {
    sortField: keyof ProductData
    sortOrder: 'asc' | 'desc'
}

export interface FilterOptions {
    filterField: keyof ProductData
    filterValue: string
}
