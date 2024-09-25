import { Search, ShoppingCart } from "lucide-react"

export function SiteNavigation() {
    return (
        <nav className="flex justify-between items-center px-32 py-5 bg-[#00634B]">
            <div className="flex gap-3 items-center">
                <img src="/logo.png" className="w-7 h-10" />
                <div className="text-white font-bold text-4xl">FLORIS</div>
            </div>
            <div className="flex items-center w-2/3 gap-8">
                <div className="flex  w-full items-center p-1 rounded-md">
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full bg-white p-2 rounded-l-md focus:outline-none focus:border-none"
                    />
                    <div className="bg-[#F8BA8C] p-2 rounded-r-md">
                        <Search className="text-[#00634B]" />
                    </div>
                </div>
                <ShoppingCart className="text-[#F8BA8C] w-10 h-10" />
                <button className="font-bold p-2 bg-[#F8BA8C] rounded-md text-base text-[#00634B]">
                    LOGIN
                </button>
            </div>
        </nav>
    )
}
