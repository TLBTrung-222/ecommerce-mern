import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import HeaderComponent from './components/Header/Header'
import Box from '@mui/material/Box'
import { CssBaseline } from '@mui/material'
import React from 'react'
import * as UserService from '~/services/UserService'
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/slices/userSlice'

const App = () => {
    const dispatch = useDispatch()

    // Fetch user data on mount
    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                // get infor from client's accessToken
                let accessToken = UserService.getAccessToken()
                if (!accessToken) return

                const decoded = UserService.decodeAccessToken(accessToken)
                if (!decoded) return

                // make sure it's not expired, if it's expired => refresh token
                const currentTime = Math.floor(Date.now() / 1000)
                if (currentTime >= decoded.exp) {
                    const newAccessToken = await handleTokenRefresh()
                    if (newAccessToken) {
                        accessToken = newAccessToken // Update accessToken with the new token
                    } else {
                        // new access token is null => refresh token is expired,
                        // TODO: prompt user to log in again
                        return
                    }
                }
                await fetchAndUpdateUser(decoded.id, accessToken as string)
            } catch (error) {
                console.error('Authentication failed:', error)
                UserService.clearAccessToken()
            }
        }

        fetchUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const fetchAndUpdateUser = async (userId: number, accessToken: string) => {
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
                                    <>
                                        {route.isShowHeader && <HeaderComponent />}
                                        <route.page />
                                    </>
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
