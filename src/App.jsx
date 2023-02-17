import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import ProfilePage from "./pages/profile/ProfilePage";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
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
