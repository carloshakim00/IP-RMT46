import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../views/ErrorPage";
import RegisterPage from "../views/RegisterPage";
import Public from "../views/PublicPage";

const router = createBrowserRouter([
    {
        path: "/public",
        element: <Public />
        // loader: () => {
        //     if (localStorage.token) {
        //         return redirect("/products")
        //     } else {
        //         return null
        //     }
        // },
        // children: [
        //     {
        //         index:true,
        //         loader: () => {
        //             return redirect("/public")
        //         },
        //     },
        //     {
        //         path: "/public",
        //         element: <Public />
        //     }
        // ]
    }
])

export default router;