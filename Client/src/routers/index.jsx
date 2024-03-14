import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../views/ErrorPage";
import RegisterPage from "../views/RegisterPage";
import Public from "../views/PublicPage";
import Authentication from "../views/AuthenticationPage";
import PublicDetailPage from "../views/PublicDetailPage";
import AuthenticationPage from "../views/AuthenticationPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: () => {
            if (localStorage.token) {
                return redirect("/products")
            } else {
                return null
            }
        },
        children: [
            {
                index:true,
                loader: () => {
                    return redirect("/public")
                },
            },
            {
                path: "/public",
                element: <Public />
            },
            {
                path: "/publicDetail/:id",
                element: <PublicDetailPage />
            }
        ],
    },
    {
        path: "/products",
        element: <AuthenticationPage />,
        loader:() => {
            if (localStorage.token) {
                return null
            } else {
                return redirect("/")
            }
        },
        children: [
            {
                index:true,
                loader: () => {
                    return redirect("/public/products")
                }
            },
            {
                path: "products",
                element: <PublicDetailPage />
            }
        ]
    }

]);

export default router;