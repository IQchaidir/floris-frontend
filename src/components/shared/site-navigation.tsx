import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { SearchProduct } from "./search-product"

export function SiteNavigation() {
    return (
        <nav className="flex justify-between items-center px-32 py-5 bg-[#00634B]">
            <Link to="/" className="flex gap-3 items-center">
                <img src="/logo.png" className="w-7 h-10" />
                <div className="text-white font-bold text-4xl">FLORIS</div>
            </Link>
            <div className="flex items-center w-2/3 gap-8">
                <div className="flex  w-full items-center p-1 rounded-md">
                    <SearchProduct />
                </div>
                <Link to="/cart">
                    <ShoppingCart className="text-[#F8BA8C] w-10 h-10" />
                </Link>
                <Link to="/login">
                    <button className="font-bold p-2 bg-[#F8BA8C] rounded-md text-base text-[#00634B]">
                        LOGIN
                    </button>
                </Link>
            </div>
        </nav>
    )
}
