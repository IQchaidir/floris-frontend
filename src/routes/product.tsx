import { ActionFunctionArgs, LoaderFunctionArgs, Form, redirect, useLoaderData } from "react-router-dom"
import { BACKEND_API_URL } from "../libs/env"
import { Product } from "../types"
import { convertToIDR } from "../libs/currency"
import { auth } from "../libs/auth"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

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
    const [quantity, setQuantity] = useState(1)

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value === "") {
            setQuantity(0)
            return
        }

        const parsedValue = parseInt(value)
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            setQuantity(parsedValue)
        }
    }

    if (!product) {
        return <p>Product "{slug}" not found.</p>
    }

    return (
        <main className="px-52 py-10">
            <div className="flex justify-between gap-36">
                <div className="w-1/3">
                    <img src={product.imageURL} alt={product.name} className="rounded-lg" />
                </div>
                <div className="space-y-5 w-2/3">
                    <p className="text-4xl font-bold">{product.name}</p>
                    <p className="text-3xl font-bold">{convertToIDR(product.price)}</p>
                    <p className="text-xl">Stock: {product.stock}</p>
                    <div className="flex gap-3 text-2xl">
                        <button
                            className="border px-5 rounded-md"
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            onChange={handleChange}
                            className="border py-2 rounded-md text-center"
                        />
                        <button className="border px-5 rounded-md" onClick={handleIncrease}>
                            +
                        </button>
                    </div>
                    <Form method="post" className="flex gap-2">
                        <input type="hidden" name="productId" value={product.id} />
                        <input type="hidden" name="quantity" value={quantity} />
                        <button className="bg-[#00634B] text-white text-3xl py-2 px-32 rounded" type="submit">
                            Add to Cart
                        </button>
                    </Form>
                    <p className="text-2xl font-semibold">Description</p>
                    <p>{product.description}</p>
                </div>
            </div>
        </main>
    )
}

type AddToCartResponse = {
    message: string
    item: {
        id: string
        productId: string
        quantity: number
        cartId: string
        createdAt: Date
        updatedAt: Date
    }
}

export async function action({ request }: ActionFunctionArgs) {
    const token = auth.getToken()
    if (!token) return redirect("/login")

    const formData = await request.formData()

    const addToCartData = {
        productId: formData.get("productId")?.toString(),
        quantity: Number(formData.get("quantity")),
    }

    const response = await fetch(`${BACKEND_API_URL}/cart/item`, {
        method: "POST",
        body: JSON.stringify(addToCartData),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    const addToCartResponse: AddToCartResponse = await response.json()

    if (!response.ok) {
        return toast({
            variant: "destructive",
            title: `${addToCartResponse.message || "Failed to add item to cart."}`,
        })
    }

    return toast({
        variant: "default",
        title: `${addToCartResponse.message || "Item added to cart successfully!"}`,
    })
}
