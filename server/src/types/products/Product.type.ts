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
