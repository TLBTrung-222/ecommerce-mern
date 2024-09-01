import { ApiResponse } from '~/types'

const productEndpoint = `${import.meta.env.VITE_API_URL}/products`

export const fetchAllProduct = async () => {
    const response = await fetch(`${productEndpoint}/`, {
        method: 'GET'
    })

    return handleApiResponse(response)
}

export const fetchAllTypes = async () => {
    const response = await fetch(`${productEndpoint}/types`, {
        method: 'GET'
    })

    return handleApiResponse(response)
}

// ------------------ helpers -------------------------------------

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.error || 'Unknown error occurred while fetching data')
    }

    return responseBody
}
