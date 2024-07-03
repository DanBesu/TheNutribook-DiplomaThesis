import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

import Menu from "./components/app-menu";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Reports from "./pages/reports";
import UsersPage from "./pages/users";

const RootPage = () => (
    <Box sx={{ display: 'flex' }}>
        <Menu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
        </Box>
    </Box>
);

const token = localStorage.getItem('token');

const router = createBrowserRouter([
    {
        path: "/",
        element: !token ? <Navigate to="/login" replace /> : <RootPage />,
        children: [
            {
                path: "/",
                element: !token ? <Navigate to="/login" replace /> : <Navigate to="/home" replace />,
            },
            {
                path: "home",
                element: !token ? <Navigate to="/login" replace /> : <Home />,
            },
            {
                path: "reports",
                element: !token ? <Navigate to="/login" replace /> : <Reports/>,
            },
            {
                path: "users",
                element: !token ? <Navigate to="/login" replace /> : <UsersPage />,
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
