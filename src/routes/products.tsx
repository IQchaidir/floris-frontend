import { useLoaderData, useLocation } from "react-router-dom"
import { BACKEND_API_URL } from "../libs/env"
import { Product } from "../types"
import { ProductsGrid } from "../components/shared/product-grid"

export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url)
    const searchQuery = url.searchParams.get("search")
    const sort = url.searchParams.get("sort") // Ambil parameter sort

    try {
        const response = await fetch(
            `${BACKEND_API_URL}/products?search=${encodeURIComponent(
                searchQuery || ""
            )}&sort=${encodeURIComponent(sort || "")}`
        )
        const data = await response.json()
        const products: Product[] = data.data
        return { products, searchQuery, sort }
    } catch (error) {
        return { products: [], searchQuery: null, sort: null }
    }
}

export function ProductsRoute() {
    const { products, searchQuery, sort } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const location = useLocation()

    const updateSort = (newSort: string) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set("sort", newSort)
        const newUrl = `${location.pathname}?${searchParams.toString()}`
        window.history.pushState({}, "", newUrl)

        window.location.reload()
    }

    return (
        <main className="px-32">
            <div className="py-10">
                <h1 className="pt-28 flex justify-center text-5xl font-bold text-[#00634B] underline underline-offset-8">
                    Search Results for: {searchQuery || "All Products"}
                </h1>

                <div className="flex justify-center mb-4 pt-6">
                    <select
                        value={sort || ""}
                        onChange={(e) => updateSort(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Sort by</option>
                        <option value="name_asc">Name Ascending</option>
                        <option value="name_desc">Name Descending</option>
                        <option value="price_asc">Price Ascending</option>
                        <option value="price_desc">Price Descending</option>
                    </select>
                </div>

                {products.length === 0 ? (
                    <div className="flex justify-center text-lg text-red-500">
                        <p>Not Found</p>
                    </div>
                ) : (
                    <ProductsGrid products={products} />
                )}
            </div>
        </main>
    )
}
