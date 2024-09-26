import { useLoaderData } from "react-router-dom"
import { BACKEND_API_URL } from "../libs/env"
import { Product } from "../types"
import { Hero } from "../components/shared/hero"
import { ProductsGrid } from "../components/shared/product-grid"

export async function loader() {
    try {
        const response = await fetch(`${BACKEND_API_URL}/products`)
        const data = await response.json()
        const products: Product[] = data.data
        return { products }
    } catch (error) {
        return { products: [] }
    }
}

export function HomeRoute() {
    const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>

    return (
        <main className="px-32">
            <div className="py-10">
                <Hero />
                <div className="pt-28 flex justify-center text-5xl font-bold text-[#00634B] underline underline-offset-8">
                    Our Product
                </div>
                <ProductsGrid products={products} />
            </div>
        </main>
    )
}
