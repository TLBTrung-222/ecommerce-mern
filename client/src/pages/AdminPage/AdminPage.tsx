/* eslint-disable */
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import {
    People as PeopleIcon,
    ShoppingCart as ShoppingCartIcon,
    CardTravelOutlined,
} from "@mui/icons-material";
import React from "react";
import AdminUser from "~/components/AdminUser/AdminUser";
import AdminProduct from "~/components/AdminProduct/AdminProduct";
import AdminOrder from "~/components/AdminOrder/AdminOrder";

interface PageItems {
    pageName: string;
    id: string;
    icon: React.ReactNode;
}

export default function AdminPage() {
    const [selectedPageId, setSelectedPageId] = React.useState<string>("users");

    const pages: PageItems[] = [
        { pageName: "Người dùng", id: "users", icon: <PeopleIcon /> },
        { pageName: "Sản phẩm", id: "products", icon: <ShoppingCartIcon /> },
        { pageName: "Đơn hàng", id: "orders", icon: <CardTravelOutlined /> },
    ];

    const handleOnClick = (pageId: string) => {
        setSelectedPageId(pageId);
    };

    const renderPage = (pageId: string) => {
        switch (pageId) {
            case "users":
                return <AdminUser />;
                break;
            case "products":
                return <AdminProduct />;
            case "orders":
                return <AdminOrder />;
            default:
                break;
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Divider />
                <Box>
                    <List>
                        {pages.map((pageItem) => (
                            <ListItem key={pageItem.id}>
                                <ListItemButton
                                    onClick={() => {
                                        handleOnClick(pageItem.id);
                                    }}
                                >
                                    <ListItemIcon>{pageItem.icon}</ListItemIcon>
                                    <ListItemText primary={pageItem.pageName} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box>{renderPage(selectedPageId)}</Box>
        </Box>
    );
}
