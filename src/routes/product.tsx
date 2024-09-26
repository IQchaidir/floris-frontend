import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { BACKEND_API_URL } from "../libs/env"
import { Product } from "../types"
import { convertToIDR } from "../libs/currency"

export async function loader({ params }: LoaderFunctionArgs) {
    const { slug } = params

    try {
        const response = await fetch(`${BACKEND_API_URL}/products/${slug}`)
        const data = await response.json()
        const product: Product = data.data
        return { slug, product }
    } catch (error) {
        return { slug, product: null }
    }
}

export function ProductSlugRoute() {
    const { slug, product } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    console.log(product)

    if (!product) {
        return <p>Product "{slug}" not found.</p>
    }

    return (
        <main className="flex justify-center">
            <div className="w-full max-w-2xl flex gap-6 pt-10">
                <img
                    src={product.imageURL}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-lg w-full max-w-xs object-contain bg-stone-200"
                />

                <div className="space-y-6">
                    <h4 className="text-3xl font-bold">{product.name}</h4>
                    <h5 className="text-2xl font-medium">{convertToIDR(product.price)}</h5>

                    <p>{product.description}</p>
                </div>
            </div>
        </main>
    )
}
