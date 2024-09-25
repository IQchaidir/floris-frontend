import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootRoute } from "./routes/root"
import { HomeRoute, loader as homeLoader } from "./routes/home"

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
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
