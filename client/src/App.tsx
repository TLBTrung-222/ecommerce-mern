import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponent from './components/Header/Header'
import Box from '@mui/material/Box'
import { CssBaseline } from '@mui/material'
import React from 'react'
import * as UserService from '~/services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slices/userSlice'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { RootState } from './redux/store'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                let accessToken = UserService.getAccessToken()
                if (!accessToken) {
                    setIsLoading(false)
                    return
                }

                const decoded = UserService.decodeAccessToken(accessToken)
                if (!decoded) {
                    setIsLoading(false)
                    return
                }

                const currentTime = Math.floor(Date.now() / 1000)
                if (currentTime >= decoded.exp) {
                    const newAccessToken = await handleTokenRefresh()
                    if (newAccessToken) {
                        accessToken = newAccessToken
                    } else {
                        setIsLoading(false)
                        return
                    }
                }

                await fetchAndUpdateUser(decoded.id, accessToken as string)
            } catch (error) {
                console.error('Authentication failed:', error)
                UserService.clearAccessToken()
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [dispatch])

    const handleTokenRefresh = async () => {
        try {
            const response = await UserService.refreshAccessToken()
            const newAccessToken = response.data?.newAccessToken
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken)
                console.log('Access token refreshed successfully')
                return newAccessToken // Return the new access token
            }
        } catch (error) {
            console.error('Failed to refresh access token:', error)
        }
        return null // Return null if token refresh fails
    }

    const fetchAndUpdateUser = async (userId: string, accessToken: string) => {
        try {
            const response = await UserService.getUserDetail(userId, accessToken)
            const userDetail = response.data?.user
            if (userDetail) {
                dispatch(updateUser(userDetail))
            }
        } catch (error) {
            console.error('Failed to fetch user details:', error)
        }
    }

    if (isLoading) {
        return <div>Loading...</div> // Or a more sophisticated loading component
    }

    return (
        <CssBaseline>
            <Box className="App">
                <Router>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <ProtectedRoute
                                        element={
                                            <>
                                                {route.isShowHeader && <HeaderComponent />}
                                                <route.page />
                                            </>
                                        }
                                        isAdminRoute={route.isAdmin}
                                        isAdminUser={user.isAdmin}
                                    />
                                }
                            />
                        ))}
                    </Routes>
                </Router>
            </Box>
        </CssBaseline>
    )
}

export default App
