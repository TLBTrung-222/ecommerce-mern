import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InputSearch from '../InputSearch/InputSearch'
import Badge from '@mui/material/Badge'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import * as React from 'react'
import * as UserService from '~/services/UserService'
import { Avatar, List, ListItem, ListItemText } from '@mui/material'
import { clearUser } from '~/redux/slices/userSlice'
import { RootState } from '~/redux/store'

function Header() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.user)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogOut = async () => {
        await UserService.logOutUser()
        dispatch(clearUser())
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#2980b9',
                padding: '10px 120px',
                color: 'white'
            }}
        >
            {/* Shop logo + name */}
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography sx={{ fontWeight: 'bold' }}>TRUNG'S SHOP</Typography>
            </Link>

            {/* Search field + Account */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InputSearch size="small" label="Search..." />
                <Avatar sx={{ ml: 3, mr: -1, bgcolor: 'secondary.main', width: 40, height: 40 }} src={user.avatar} />
                <Box sx={{ fontSize: 'small' }}>
                    <Box>
                        {user.name ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box>
                                    <Button sx={{ color: 'white' }} onClick={handleClick}>
                                        <Typography>{user.name}</Typography>
                                    </Button>
                                    <Popover
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                    >
                                        <List>
                                            <ListItem button onClick={() => navigate(`/profiles/${user.id}`)}>
                                                <ListItemText primary="Thông tin tài khoản" />
                                            </ListItem>
                                            <ListItem button onClick={handleLogOut}>
                                                <ListItemText primary="Đăng xuất" />
                                            </ListItem>
                                        </List>
                                    </Popover>
                                </Box>
                            </Box>
                        ) : (
                            <>
                                <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Đăng nhập/Đăng kí
                                </Link>
                                <Box>Tài khoản</Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Card */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </Badge>

                <Typography>Giỏ hàng</Typography>
            </Box>
        </Box>
    )
}

export default Header
