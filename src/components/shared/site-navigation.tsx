import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { SearchProduct } from "./search-product"
import { User } from "../../types"
import { getAvatarURL } from "../../libs/avatar"

interface SiteNavigationProps {
    isAuthenticated?: boolean
    user?: User | null
}

export function SiteNavigation({ isAuthenticated, user }: SiteNavigationProps) {
    return (
        <nav className="sticky top-0 flex z-50 justify-between items-center px-32 py-5 bg-[#00634B]">
            <Link to="/" className="flex gap-3 items-center">
                <img src="/logo.png" className="w-7 h-10" />
                <div className="text-white font-bold text-4xl">FLORIS</div>
            </Link>
            <div className="flex items-center w-2/3 gap-8">
                <div className="flex w-full items-center p-1 rounded-md">
                    <SearchProduct />
                </div>
                {isAuthenticated && user ? (
                    <>
                        <Link to="/cart" className="relative">
                            <ShoppingCart className="text-[#F8BA8C] w-10 h-10" />
                            {user && (
                                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {user.totalCart ?? 0}
                                </span>
                            )}
                        </Link>
                        <Link to="/dashboard">
                            <img
                                src={getAvatarURL(user.username)}
                                alt={user.id}
                                className="size-14 rounded-full"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="font-bold p-2 bg-[#F8BA8C] rounded-md text-base text-[#00634B]">
                                LOGIN
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="font-bold p-2 bg-[#F8BA8C] rounded-md text-base text-[#00634B]">
                                REGISTER
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
