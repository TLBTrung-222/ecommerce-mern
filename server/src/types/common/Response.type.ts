// types/ResponseType.ts
export interface ApiResponse<T = any> {
    success: boolean
    message?: string // success message (only used for succes = true)
    data?: T
    error?: string // technial error
}
