import { Search } from "lucide-react"
import { useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"

export function SearchProduct() {
    const searchInputRef = useRef<HTMLInputElement>(null)
    const location = useLocation()

    const initialSearch = new URLSearchParams(location.search).get("search") || ""

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.value = initialSearch
        }
    }, [initialSearch])

    return (
        <form method="get" action="/products" className="flex w-full items-center p-1 rounded-md">
            <input
                type="text"
                name="search"
                placeholder="What are you looking for?"
                className="w-full bg-white p-2 rounded-l-md focus:outline-none focus:border-none"
                ref={searchInputRef}
                defaultValue={initialSearch}
            />
            <button type="submit" className="bg-[#F8BA8C] p-2 rounded-r-md">
                <Search className="text-[#00634B]" />
            </button>
        </form>
    )
}
