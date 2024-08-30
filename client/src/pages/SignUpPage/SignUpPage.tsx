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
import { SignUpForm } from '~/types'
import { useMutation } from '@tanstack/react-query'
import * as UserService from '~/services/UserService'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUpPage() {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

    const signUpMutation = useMutation({
        mutationFn: UserService.signUpUser,
        onError: (error) => {
            // we throw error on service
            setErrorMessage(error.message)
        },
        onSuccess: () => {
            console.log('sign up successfully')
        }
    })

    const { isPending, isSuccess, isError } = signUpMutation

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const signUpData: SignUpForm = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirmPassword') as string,
            phone: formData.get('phone') as string | undefined
        }

        setErrorMessage(null)

        // call mutate
        signUpMutation.mutate(signUpData)
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
                {/* Header icons + text */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng kí
                </Typography>

                {/* Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/* Name */}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Họ và tên"
                                autoFocus
                            />
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        {/* Password */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        {/* Confirm password */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Nhập lại mật khẩu"
                                type="password"
                                id="confirmPassword"
                                autoComplete="confirm-password"
                            />
                        </Grid>
                        {/* Phone? */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="phone"
                                label="Số điện thoại (tuỳ chọn)"
                                type="tel"
                                id="phone"
                                autoComplete="phone"
                            />
                        </Grid>
                        {/* email marketing */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Đăng kí
                    </Button>
                    {isError && (
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
                    {isSuccess && (
                        <Alert severity="success" sx={{ width: '100%' }}>
                            {'Đăng nhập thành công, đang chuyển hướng...'}
                        </Alert>
                    )}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="sign-in" variant="body2">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
