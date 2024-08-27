import * as db from '../db'
import { ProductData } from '../types'
import { ApiError } from '../utils/ApiError'

class Product {
    async findById(id: string): Promise<ProductData | null> {
        try {
            const sql = `SELECT * FROM products WHERE id=$1`
            const values = [id]
            const result = await db.query(sql, values)

            return result.rows[0] || null
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }
}
