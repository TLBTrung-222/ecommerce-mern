import React from 'react'
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    CircularProgress,
    Alert,
    InputLabel
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import * as UserService from '~/services/UserService'
import { RootState } from '~/redux/store'
import { updateUser } from '~/redux/slices/userSlice' // You'll need to create this action
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
})

const UserProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)

    const [avatarBase64, setAvatarBase64] = React.useState<string | null>(null)
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

    const updateProfileMutation = useMutation({
        mutationFn: UserService.updateUserProfile,
        onError: (error) => {
            setErrorMessage((error as Error).message)
            console.log('error updateProfileMutation: ', error)
        },
        onSuccess: (response) => {
            console.log('Profile updated successfully:', response)
            dispatch(updateUser(response.data.updatedUser))
        }
    })

    const { isPending, isSuccess, isError } = updateProfileMutation

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const profileData = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            avatar: avatarBase64 // Include the avatar base64 string from state
        }

        setErrorMessage(null)
        updateProfileMutation.mutate(profileData)
    }

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarBase64(reader.result as string) // Store the base64 string in the state
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }} src={user.avatar} />
                <Typography component="h1" variant="h5">
                    Thông tin người dùng
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    {/* Main form */}
                    <Grid container spacing={2}>
                        {/* Upload avatar */}
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload avatar
                                <VisuallyHiddenInput type="file" onChange={handleAvatarUpload} />
                            </Button>
                            {avatarBase64 && <Avatar sizes="lg" alt="image" src={avatarBase64} />}
                        </Grid>

                        {/* Name */}
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={3}>
                                <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>
                                    Full Name
                                </InputLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField autoComplete="name" name="name" required fullWidth id="name" />
                            </Grid>
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={3}>
                                <InputLabel htmlFor="email" sx={{ fontWeight: 'bold' }}>
                                    Email Address
                                </InputLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    id="email"
                                    name="email"
                                    fullWidth
                                    autoComplete="off"
                                    variant="outlined"
                                    value={user.email}
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* Phone */}
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={3}>
                                <InputLabel htmlFor="phone" sx={{ fontWeight: 'bold' }}>
                                    Phone Number
                                </InputLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField fullWidth name="phone" type="tel" id="phone" autoComplete="tel" />
                            </Grid>
                        </Grid>

                        {/* Address */}
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={3}>
                                <InputLabel htmlFor="address" sx={{ fontWeight: 'bold' }}>
                                    Address
                                </InputLabel>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField fullWidth name="address" id="address" autoComplete="address-line1" />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Update button */}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isPending}>
                        Cập nhật thông tin
                    </Button>

                    {/* Handle status */}
                    {isError && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {errorMessage}
                        </Alert>
                    )}
                    {isPending && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {isSuccess && (
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Profile updated successfully
                        </Alert>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default UserProfile
