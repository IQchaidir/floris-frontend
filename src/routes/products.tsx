import { useLoaderData, useLocation } from "react-router-dom"
import { BACKEND_API_URL } from "../libs/env"
import { Product } from "../types"
import { ProductsGrid } from "../components/shared/product-grid"

import { LoaderFunctionArgs } from "react-router-dom"

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)

    try {
        const response = await fetch(`${BACKEND_API_URL}/products?${searchParams.toString()}`)
        const data = await response.json()
        const products: Product[] = data.data

        return { products, searchParams: Object.fromEntries(searchParams) }
    } catch (error) {
        return { products: [], searchParams: {} }
    }
}

export function ProductsRoute() {
    const { products, searchParams } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const location = useLocation()

    const updateSort = (newSort: string) => {
        const searchParams = new URLSearchParams(location.search)

        if (newSort) {
            searchParams.set("sort", newSort)
        } else {
            searchParams.delete("sort")
        }

        const newUrl = `${location.pathname}?${searchParams.toString()}`
        window.history.pushState({}, "", newUrl)

        window.location.reload()
    }

    const hasSearchParam = searchParams.search && searchParams.search.trim() !== ""

    return (
        <main className="px-32">
            <div className="py-10">
                <h1 className="flex  text-5xl font-bold text-[#00634B]">
                    {hasSearchParam ? `Search Results for: ${searchParams.search}` : "All Products"}
                </h1>

                <div className="flex pt-6">
                    <select
                        value={searchParams.sort || ""}
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
