import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom"
import { SiteNavigation } from "../components/shared/site-navigation"
import { SiteFooter } from "../components/shared/site-footer"
import { auth } from "../libs/auth"
import { CookiesProvider } from "react-cookie"

export async function loader() {
    const user = await auth.checkUser()

    if (!auth.isAuthenticated) {
        await auth.checkUser()
    }

    return {
        isAuthenticated: auth.isAuthenticated,
        user: user,
    }
}

export function RootRoute() {
    const { isAuthenticated, user } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    return (
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <ScrollRestoration />
            <div className="flex flex-col min-h-screen">
                <SiteNavigation isAuthenticated={isAuthenticated} user={user} />
                <div className="flex-[1]">
                    <Outlet />
                </div>
                <SiteFooter />
            </div>
        </CookiesProvider>
    )
}
