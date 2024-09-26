import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootRoute } from "./routes/root"
import { HomeRoute, loader as homeLoader } from "./routes/home"
import { ProductSlugRoute, loader as productSlugLoader } from "./routes/product"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootRoute />,
        children: [
            {
                path: "/",
                element: <HomeRoute />,
                loader: homeLoader,
            },
            {
                path: "/products/:slug",
                element: <ProductSlugRoute />,
                loader: productSlugLoader,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
