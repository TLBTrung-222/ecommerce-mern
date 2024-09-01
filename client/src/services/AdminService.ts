import { ApiResponse } from '~/types'
import { UserData } from '~/types'

const adminEndpoint = `${import.meta.env.VITE_API_URL}/users`

interface AllUser {
    users: UserData[]
}

export const getAllUsers = async (): Promise<ApiResponse<AllUser>> => {
    const response = await fetch(`${adminEndpoint}/`, { method: 'GET', credentials: 'include' })

    return handleApiResponse(response)
}

// --- Helper ------------

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    const responseBody: ApiResponse = await response.json()

    if (!response.ok) {
        throw new Error(responseBody.error || 'Unknown error occurred while fetching data')
    }

    return responseBody
}
