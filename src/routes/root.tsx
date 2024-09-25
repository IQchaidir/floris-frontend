import { Outlet } from "react-router-dom"
import { SiteNavigation } from "../components/shared/site-navigation"
import { SiteFooter } from "../components/shared/site-footer"

export function RootRoute() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteNavigation />
            <div className="flex-[1]">
                <Outlet />
            </div>
            <SiteFooter />
        </div>
    )
}
