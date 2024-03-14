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
        children: [
            {
                path: "/",
                element: <Public />
            },
            {
                path: "/publicDetail/:id",
                element: <PublicDetailPage />
            }
        ]
    }
]);

export default router;