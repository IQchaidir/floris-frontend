import { ShoppingBag } from "lucide-react"
import { auth } from "../libs/auth"
import { ActionFunctionArgs, redirect, useLoaderData } from "react-router-dom"
import { BACKEND_API_URL } from "../libs/env"
import { Cart } from "../types"
import { CartItemsList } from "../components/shared/cart-item-list"
import { toast } from "@/hooks/use-toast"
import { convertToIDR } from "@/libs/currency"

export async function loader() {
    const user = await auth.checkUser()
    if (!user) return redirect("/login")

    const response = await fetch(`${BACKEND_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` },
    })

    const data = await response.json()
    const cart: Cart = data.cart

    return { cart }
}

export function CartRoute() {
    const data = useLoaderData() as Awaited<ReturnType<typeof loader>>
    if (data instanceof Response) return null

    return (
        <main className="px-32 pb-8">
            <div className="pt-20 space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Your Cart</p>
                    <div className="flex gap-5">
                        <div className="text-end text-xl text-gray-500">
                            <p>Subtotal</p>
                            <p>{convertToIDR(data.cart.totalAmount)}</p>
                        </div>
                        <button className="flex gap-2 items-center bg-[#F8BA8C] text-[#00634B] px-5 rounded-md">
                            <ShoppingBag /> <span className="text-lg font-semibold">CHECKOUT</span>
                        </button>
                    </div>
                </div>
                <CartItemsList cartItems={data.cart.items} />
            </div>
        </main>
    )
}

export async function action({ request }: ActionFunctionArgs) {
    const token = auth.getToken()
    if (!token) return null

    const formData = await request.formData()
    const productId = formData.get("productId")?.toString()
    const quantity = Number(formData.get("quantity"))

    const method = request.method === "DELETE" ? "DELETE" : "PUT"

    const cartItemData = {
        productId,
        quantity: method === "DELETE" ? undefined : quantity,
    }

    const response = await fetch(`${BACKEND_API_URL}/cart/item/${productId}`, {
        method,
        body: method === "DELETE" ? null : JSON.stringify(cartItemData),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })

    const cartResponse = await response.json()

    if (!cartResponse) return null

    return redirect("/cart")
}
