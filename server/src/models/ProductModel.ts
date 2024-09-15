import * as db from '../db'
import { FilterOptions, ProductCreateForm, ProductData, ProductUpdateForm, SortOptions } from '../types'
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

    /**
     * @notice If no parameters passed, it return all products
     * @param limit optional
     * @param offset optional
     * @returns The amount of product after pagination, or all product in db
     */
    async findAll(
        limit: number,
        offset: number,
        sortOptions?: SortOptions,
        filterOptions?: FilterOptions
    ): Promise<ProductData[]> {
        try {
            let sql = `SELECT * FROM products`
            const values: (number | string)[] = []
            let index = 1

            // Apply filtering if filterOptions is provided
            if (filterOptions) {
                sql += ` WHERE ${filterOptions.filterField} ILIKE $${index++}`
                values.push(`%${filterOptions.filterValue}%`)
            }

            // Apply sorting if sortOptions is provided
            if (sortOptions) {
                sql += ` ORDER BY ${sortOptions.sortField} ${sortOptions.sortOrder}`
            }

            // Apply pagination
            sql += ` LIMIT $${index++} OFFSET $${index++}`
            values.push(limit, offset)

            const result = await db.query(sql, values)
            return result.rows
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async count(filterOptions?: { field: keyof ProductData; value: string }): Promise<number> {
        try {
            let sql = `SELECT COUNT(*) FROM products`
            const values: string[] = []
            let index = 1

            // Apply filtering if filterOptions is provided
            if (filterOptions) {
                sql += ` WHERE ${filterOptions.field} ILIKE $${index++}`
                values.push(`%${filterOptions.value}%`)
            }

            const result = await db.query(sql, values)
            return parseInt(result.rows[0].count, 10)
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async findTypes(): Promise<string[]> {
        try {
            const sql = `SELECT DISTINCT type FROM products`
            const result = await db.query(sql)

            return result.rows
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async create(data: ProductCreateForm): Promise<ProductData> {
        try {
            const sql = `INSERT INTO products (name, image, type, price, count_in_stock, description, discount)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        RETURNING *`
            const values = [
                data.name,
                data.image,
                data.type,
                data.price,
                data.count_in_stock,
                data.description,
                data.discount
            ]
            const result = await db.query(sql, values)

            return result.rows[0] || null
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async update(data: ProductData): Promise<ProductData> {
        try {
            const sql = `UPDATE products
                        SET name=$2, image=$3, type=$4, price=$5, count_in_stock=$6, rating=$7, description=$8, discount=$9, selled=$10, updated_at=now() 
                        WHERE id=$1
                        RETURNING *`
            const values = [
                data.id,
                data.name,
                data.image,
                data.type,
                data.price,
                data.count_in_stock,
                data.rating,
                data.description,
                data.discount,
                data.selled
            ]
            const result = await db.query(sql, values)
            return result.rows[0]
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async delete(id: string): Promise<ProductData> {
        try {
            const sql = `DELETE FROM products 
                        WHERE id=$1 
                        RETURNING *`
            const values = [id]
            const result = await db.query(sql, values)
            return result.rows[0] || null
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async deleteBatch(ids: string[]): Promise<ProductData[]> {
        try {
            // Convert string IDs to integers, assuming they represent numeric IDs
            const intIds = ids.map((id) => parseInt(id, 10))

            const sql = `DELETE FROM products 
                        WHERE id = ANY(CAST($1 as int[]))
                        RETURNING *`
            const values = [intIds]
            const result = await db.query(sql, values)
            return result.rows
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }
}

export default new Product()
