import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

interface IRoute {
    path: string;
    page: React.ComponentType;
    isShowHeader: boolean;
    isPrivated: boolean; // only admin can access
}

export const routes: IRoute[] = [
    {
        path: "/",
        page: HomePage,
        isShowHeader: true,
        isPrivated: false,
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
        isPrivated: false,
    },
    {
        path: "/product",
        page: ProductPage,
        isShowHeader: true,
        isPrivated: false,
    },
    {
        path: "*",
        page: NotFoundPage,
        isShowHeader: false,
        isPrivated: false,
    },
];
