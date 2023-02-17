import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/auth/Auth";
import NonAuth from "./components/auth/NonAuth";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import ProfilePage from "./pages/profile/ProfilePage";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <NonAuth><Login /></NonAuth>,
    },
    {
        path: "/register",
        element: <NonAuth><Register /></NonAuth>,
    },
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/profile",
        element: (
            <Auth>
                <ProfilePage />
            </Auth>
        ),
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export function App() {
    return (
        <div className="flex flex-col items-center">
            <div className="max-w-[1140px] w-full">
                <RouterProvider router={router} />
            </div>
        </div>
    );
}
