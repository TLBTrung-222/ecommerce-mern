export interface ProductData {
    id: number
    name: string
    image: string
    type: string
    price: number
    count_in_stock: number
    rating: string
    description?: string
    discount?: number
    selled?: number
    created_at: Date
    updated_at: Date
}
