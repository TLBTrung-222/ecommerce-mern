import React from 'react'
import HomePage from '../pages/HomePage/HomePage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '~/pages/TypeProductPage/TypeProductPage'
import SignInPage from '~/pages/SignInPage/SignInPage'
import SignUpPage from '~/pages/SignUpPage/SignUpPage'
import ProductDetailPage from '~/pages/ProductDetailPage/ProductDetailPage'
import ProfilePage from '~/pages/ProfilePage/ProfilePage'
import AdminPage from '~/pages/AdminPage/AdminPage'

interface IRoute {
    path: string
    page: React.ComponentType
    isShowHeader: boolean
    isPrivated: boolean // only user can access
    isAdmin: boolean
}

export const routes: IRoute[] = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/profiles/:id',
        page: ProfilePage,
        isShowHeader: true,
        isPrivated: true,
        isAdmin: false
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/product-detail',
        page: ProductDetailPage,
        isShowHeader: true,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
        isPrivated: false,
        isAdmin: false
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivated: true,
        isAdmin: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false,
        isPrivated: false,
        isAdmin: false
    }
]
