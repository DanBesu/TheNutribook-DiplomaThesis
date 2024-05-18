import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootPage from "./pages/RootPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage/>,
    },
    {
        path: "/home",
        element: <>Home</>
    },
    {
        path: "/reports",
        element: <>Reports</>
    },
    {
        path: "/calculator",
        element: <>Calculator</>
    },
    {
        path: "/login",
        element: <>Login</>
    },
    {
        path: "/register",
        element: <>Register</>
    },
]);

const AppRouter = () => <RouterProvider router={router}/>

export default AppRouter;