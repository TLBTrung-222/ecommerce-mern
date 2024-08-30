import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import * as UserService from '~/services/UserService'
import { ApiResponse, SignInForm, UserData } from '~/types'
import { useMutation } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { updateUser } from '~/redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

interface successLoginResponseBody {
    success: boolean
    message: string
    data: {
        accessToken: string
    }
}

interface decodedPayload {
    id: string
    isAdmin: boolean
    iat: number
    exp: number
}

export default function SignInPage() {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

    const logInMutation = useMutation({
        mutationFn: UserService.logInUser,
        onError: (error) => {
            setErrorMessage(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.')
        },
        onSuccess: () => {
            setErrorMessage(null) // Clear error message on successful login
        }
    })
    // data: the body of response from server (the json backend return: res.json(...))
    const { data: responseData, isPending, isSuccess, isError } = logInMutation

    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchData() {
            if (isSuccess && responseData) {
                try {
                    const accessToken = (responseData as successLoginResponseBody).data.accessToken
                    localStorage.setItem('accessToken', accessToken)
                    const decoded = jwtDecode<decodedPayload>(accessToken)

                    const userDetail = await getUserDetail(decoded.id, accessToken)
                    dispatch(updateUser({ ...userDetail, accessToken }))
                    navigate('/')
                } catch (error) {
                    setErrorMessage((error as Error).message || 'Error fetching user details')
                    logInMutation.reset()
                }
            }
        }
        fetchData()
        // eslint-disable-next-line
    }, [isSuccess, responseData])

    const getUserDetail = async (id: string, accessToken: string) => {
        const responseBody: ApiResponse<{ user: UserData }> = await UserService.getUserDetail(id, accessToken)

        // actually no need, because we already throw error on UserService.getUserDetail
        if (!responseBody.success) {
            throw new Error(responseBody.error || 'Failed to fetch user details')
        }
        return responseBody.data?.user
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Get form data
        const formData = new FormData(event.currentTarget)

        // Construct JSON object from FormData
        const signInData: SignInForm = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        }

        // Clear previous error messages
        setErrorMessage(null)

        // Send data to backend API
        logInMutation.mutate(signInData)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Lock icon */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                {/* Text */}
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {/* Email + password */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {/* Remember me button */}
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

                    {/* Button sign in + error text if login failed */}
                    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isPending} // Disable button while loading
                        >
                            Đăng nhập
                        </Button>

                        {(isError || errorMessage) && (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {errorMessage}
                            </Alert>
                        )}

                        {isPending && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-8px',
                                    marginLeft: '-12px'
                                }}
                            />
                        )}

                        {isSuccess && !errorMessage && (
                            <Alert severity="success" sx={{ width: '100%' }}>
                                {'Đăng nhập thành công, đang chuyển hướng...'}
                            </Alert>
                        )}
                    </Box>

                    {/* Footer */}
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {'Chưa có tài khoản? Đăng kí'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
