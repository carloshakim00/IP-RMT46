import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../views/ErrorPage";
import RegisterPage from "../views/RegisterPage";
import Public from "../views/PublicPage";
import Authentication from "../views/AuthenticationPage";
import PublicDetailPage from "../views/PublicDetailPage";
import AuthenticationPage from "../views/AuthenticationPage";
import AboutUs from "../views/AboutUs";
import ContactUs from "../views/ContactUs";
import LoginPage from "../views/LoginPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Public />
            },
            {
                path: "/publicDetail/:id",
                element: <PublicDetailPage />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/contact",
                element: <ContactUs />
            },
            {
                path: "/products",
                element:
            },

        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    }
]);

export default router;