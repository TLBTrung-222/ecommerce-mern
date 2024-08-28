import * as db from '../db'
import { UserData, UserWithHashedPassword } from '../types'
import { ApiError } from '../utils/ApiError'

/**
 * Interact with db, return user | null | throw error
 */
class User {
    async create(data: UserWithHashedPassword): Promise<UserData> {
        const { name, email, pw_hash, pw_salt } = data
        const sql = `INSERT INTO users (name, email, pw_hash, pw_salt) 
                     VALUES ($1, $2, $3, $4) 
                     RETURNING *`
        const values = [name, email, pw_hash, pw_salt]

        try {
            const result = await db.query(sql, values)
            if (result.rows.length === 0) {
                throw new ApiError('Failed to create user', 500)
            }
            return result.rows[0]
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async update(data: UserData): Promise<UserData> {
        const sql = `UPDATE users 
                     SET name=$2, pw_hash=$3, pw_salt=$4, is_admin=$5, phone=$6, address=$7, avatar=$8, city=$9, updated_at=now() 
                     WHERE id=$1
                     RETURNING *`
        const values = [
            data.id,
            data.name,
            data.pw_hash,
            data.pw_salt,
            data.is_admin,
            data.phone,
            data.address,
            data.avatar,
            data.city
        ]

        try {
            const result = await db.query(sql, values)
            if (result.rows.length === 0) {
                throw new ApiError('User not found', 404)
            }
            return result.rows[0]
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async delete(id: string): Promise<UserData> {
        const sql = `DELETE FROM users WHERE id=$1 RETURNING *`
        const values = [id]

        try {
            const result = await db.query(sql, values)
            if (result.rows.length === 0) {
                throw new ApiError('User not found', 404)
            }
            return result.rows[0]
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async findById(id: string): Promise<UserData | null> {
        const sql = `SELECT * FROM users WHERE id=$1`
        const values = [id]

        try {
            const result = await db.query(sql, values)
            return result.rows[0] || null
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async findByEmail(email: string): Promise<UserData | null> {
        const sql = `SELECT * FROM users WHERE email=$1`
        const values = [email]

        try {
            const result = await db.query(sql, values)
            return result.rows[0] || null
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }

    async getAll(): Promise<UserData[]> {
        const sql = `SELECT * FROM users WHERE is_admin=false`

        try {
            const result = await db.query(sql)
            return result.rows
        } catch (error) {
            throw new ApiError(`Database error: ${(error as Error).message}`, 500)
        }
    }
}

export default new User()
