import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

import Menu from "./components/app-menu";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Reports from "./pages/reports";

const RootPage = () => (
    <Box sx={{ display: 'flex' }}>
        <Menu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
        </Box>
    </Box>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" replace />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "reports",
                element: <Reports/>,
            },
            {
                path: "users",
                element: <>Users</>,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter;
