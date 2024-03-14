const { createBrowserRouter } = require("react-router-dom");
const { default: RootLayout } = require("../layouts/RootLayout");

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement
    }
])