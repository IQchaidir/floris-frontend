import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootRoute, loader as rootLoader } from "./routes/root"
import { HomeRoute, loader as homeLoader } from "./routes/home"
import { ProductSlugRoute, loader as productSlugLoader, action as productSlugAction } from "./routes/product"
import { ProductsRoute, loader as productsLoader } from "./routes/products"
import { CartRoute, loader as cartLoader, action as cartAaction } from "./routes/cart"
import { RegisterRoute, loader as registerLoader, action as registerAction } from "./routes/register"
import { LoginRoute, loader as loginLoader, action as loginAction } from "./routes/login"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootRoute />,
        loader: rootLoader,
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
                action: productSlugAction,
            },
            {
                path: "/cart",
                element: <CartRoute />,
                loader: cartLoader,
                action: cartAaction,
            },
            {
                path: "/login",
                element: <LoginRoute />,
                loader: loginLoader,
                action: loginAction,
            },
            {
                path: "/register",
                element: <RegisterRoute />,
                loader: registerLoader,
                action: registerAction,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
