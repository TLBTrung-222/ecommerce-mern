import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { routes } from "./routes";
import HeaderComponent from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import * as UserService from "~/services/UserService";
import { updateUser } from "./redux/slices/userSlice";
import { RootState } from "./redux/store";

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let accessToken = UserService.getAccessToken();
                if (!accessToken) {
                    setIsLoading(false);
                    return;
                }

                const decoded = UserService.decodeAccessToken(accessToken);
                if (!decoded) {
                    setIsLoading(false);
                    return;
                }

                const currentTime = Math.floor(Date.now() / 1000);
                if (currentTime >= decoded.exp) {
                    const newAccessToken = await handleTokenRefresh();
                    if (newAccessToken) {
                        accessToken = newAccessToken;
                    } else {
                        setIsLoading(false);
                        return;
                    }
                }

                await fetchAndUpdateUser(decoded.id, accessToken as string);
            } catch (error) {
                console.error("Authentication failed:", error);
                UserService.clearAccessToken();
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const handleTokenRefresh = async () => {
        try {
            const response = await UserService.refreshAccessToken();
            const newAccessToken = response.data?.newAccessToken;
            if (newAccessToken) {
                localStorage.setItem("accessToken", newAccessToken);
                console.log("Access token refreshed successfully");
                return newAccessToken;
            }
        } catch (error) {
            console.error("Failed to refresh access token:", error);
        }
        return null;
    };

    const fetchAndUpdateUser = async (userId: string, accessToken: string) => {
        try {
            const response = await UserService.getUserDetail(
                userId,
                accessToken
            );
            const userDetail = response.data?.user;
            if (userDetail) {
                dispatch(updateUser(userDetail));
            }
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <CssBaseline />
            <Router>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <ProtectedRoute
                                    isAdminRoute={route.isAdmin}
                                    isAdminUser={user.isAdmin}
                                    element={
                                        <>
                                            {route.isShowHeader && (
                                                <HeaderComponent />
                                            )}
                                            <route.page />
                                        </>
                                    }
                                />
                            }
                        />
                    ))}
                </Routes>
            </Router>
        </Box>
    );
};

export default App;
