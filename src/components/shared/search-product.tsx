import { Search } from "lucide-react"
import { useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function SearchProduct() {
    const searchInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const location = useLocation()

    const initialSearch = new URLSearchParams(location.search).get("search") || ""

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (searchInputRef.current) {
            const searchTerm = searchInputRef.current.value.trim()

            if (searchTerm) {
                navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
            }
        }
    }

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.value = initialSearch
        }
    }, [initialSearch])

    return (
        <form onSubmit={handleSearch} className="flex w-full items-center p-1 rounded-md">
            <input
                type="text"
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
