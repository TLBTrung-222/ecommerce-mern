import * as React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import type { Navigation, Router } from '@toolpad/core'
import AdminUser from '~/components/AdminUser/AdminUser'
import AdminProduct from '~/components/AdminProduct/AdminProduct'
import AdminOrder from '~/components/AdminOrder/AdminOrder'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import InventoryIcon from '@mui/icons-material/Inventory'

const NAVIGATION: Navigation = [
    {
        segment: 'users', // define the navigation URL, used for 'pathname' in PageContent
        title: 'Người dùng',
        icon: <ManageAccountsIcon />
    },
    {
        segment: 'products',
        title: 'Sản phẩm',
        icon: <InventoryIcon />
    },
    {
        segment: 'orders',
        title: 'Đơn hàng',
        icon: <ShoppingCartIcon />
    }
]

export default function AdminPage() {
    const [pathname, setPathname] = React.useState('/dashboard')

    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path))
        }
    }, [pathname])

    // base on path name, choose page to render
    const pageToRender = (page: string) => {
        switch (page) {
            case '/users':
                return <AdminUser />

            case '/products':
                return <AdminProduct />

            case '/orders':
                return <AdminOrder />
            default:
                return <></>
        }
    }

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'MUI'
            }}
            router={router}
        >
            <DashboardLayout>{pageToRender(pathname)}</DashboardLayout>
        </AppProvider>
    )
}
