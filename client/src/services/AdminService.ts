import { ApiResponse } from "~/types";
import { UserData } from "~/types";
import * as UserSerivce from "~/services/UserService";

const adminEndpoint = `${import.meta.env.VITE_API_URL}/users`;

interface AllUser {
    users: UserData[];
}

export const getAllUsers = async (): Promise<ApiResponse<AllUser>> => {
    const accessToken = UserSerivce.getAccessToken();
    const response = await fetch(`${adminEndpoint}/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleApiResponse(response);
};

// --- Helper ------------

const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    const responseBody: ApiResponse = await response.json();

    if (!response.ok) {
        throw new Error(
            responseBody.error || "Unknown error occurred while fetching data"
        );
    }

    return responseBody;
};
