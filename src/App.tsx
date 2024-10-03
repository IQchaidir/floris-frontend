import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootRoute } from "./routes/root"
import { HomeRoute, loader as homeLoader } from "./routes/home"
import { ProductSlugRoute, loader as productSlugLoader } from "./routes/product"
import { ProductsRoute, loader as productsLoader } from "./routes/products"
import { CartRoute } from "./routes/cart"
import { LoginRoute } from "./routes/login"

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
                path: "/products",
                element: <ProductsRoute />,
                loader: productsLoader,
            },
            {
                path: "/products/:slug",
                element: <ProductSlugRoute />,
                loader: productSlugLoader,
            },
            {
                path: "/cart",
                element: <CartRoute />,
            },
            {
                path: "/login",
                element: <LoginRoute />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
