import {
    IPayload,
    SignInForm,
    SignUpForm,
    UserData,
    ApiResponse,
    UpdateForm,
} from "~/types";
import { jwtDecode } from "jwt-decode";

const userEndpoint = `${import.meta.env.VITE_API_URL}/users`;

export const logInUser = async (
    signInData: SignInForm
): Promise<ApiResponse> => {
    const response = await fetch(`${userEndpoint}/auth/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
    });

    return handleApiResponse(response);
};

export const signUpUser = async (
    signUpData: SignUpForm
): Promise<ApiResponse> => {
    const response = await fetch(`${userEndpoint}/auth/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
    });

    return handleApiResponse(response);
};

export const getUserDetail = async (
    id: string,
    accessToken: string | null
): Promise<ApiResponse<{ user: UserData }>> => {
    const response = await fetch(`${userEndpoint}/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleApiResponse(response);
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
};

export const decodeAccessToken = (
    accessToken: string
): IPayload | undefined => {
    try {
        return jwtDecode<IPayload>(accessToken);
    } catch (error) {
        console.error("Invalid access token:", error);
        return undefined;
    }
};

export const refreshAccessToken = async () => {
    const response = await fetch(`${userEndpoint}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
    });

    return handleApiResponse(response);
};

export const clearAccessToken = () => {
    localStorage.removeItem("accessToken");
};

export const logOutUser = async () => {
    try {
        const response = await fetch(`${userEndpoint}/auth/log-out`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Logout failed on the server");

        localStorage.removeItem("accessToken");
    } catch (error) {
        console.error("Logout error:", error);
        localStorage.removeItem("accessToken");
    }
};

export const updateUserProfile = async ({
    userId,
    data,
}: {
    userId: number;
    data: UpdateForm;
}) => {
    const accessToken = getAccessToken() as string;

    const response = await fetch(`${userEndpoint}/${userId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return handleApiResponse(response);
};

// Helper function to handle API response
const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    const responseBody: ApiResponse = await response.json();
    if (!response.ok) {
        throw new Error(
            responseBody.error || "Unknown error occurred while fetching data"
        );
    }
    return responseBody;
};
