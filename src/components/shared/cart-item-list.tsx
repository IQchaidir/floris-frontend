import { Link, Form } from "react-router-dom"
import { ShoppingCartIcon, Trash } from "lucide-react"
import { CartItem } from "../../types"
import { convertToIDR } from "../../libs/currency"

export function CartItemsList({ cartItems }: { cartItems: CartItem[] }) {
    if (cartItems.length <= 0) {
        return (
            <div className=" flex flex-col space-y-2 items-center pt-14 text-4xl font-semibold">
                <ShoppingCartIcon className="w-28 h-28" />
                <p>Your cart is currently empty!</p>
            </div>
        )
    }

    return (
        <ul className="space-y-6">
            {cartItems.map((cartItem) => (
                <li key={cartItem.id}>
                    <div className="border p-5 rounded-md flex justify-between">
                        <div className="flex gap-10 items-center">
                            <Link to={`/products/${cartItem.product.slug}`}>
                                <img
                                    src={cartItem.product.imageURL}
                                    alt={cartItem.product.name}
                                    width={200}
                                    height={200}
                                    className="rounded-lg w-full h-60"
                                />
                            </Link>
                            <div className="space-y-2">
                                <Link to={`/products/${cartItem.product.slug}`}>
                                    <h4 className="text-2xl font-bold">{cartItem.product.name}</h4>
                                </Link>
                                <p className="text-xl text-gray-500">
                                    {convertToIDR(cartItem.product.price)}
                                </p>
                                <div className="flex gap-3 text-lg pt-2">
                                    <Form method="put" className="flex gap-2">
                                        <input type="hidden" name="productId" value={cartItem.id} />
                                        <input type="hidden" name="quantity" value={cartItem.quantity - 1} />
                                        <button
                                            className="border px-5 rounded-md"
                                            type="submit"
                                            disabled={cartItem.quantity === 1}
                                        >
                                            -
                                        </button>
                                    </Form>
                                    <input
                                        type="text"
                                        value={cartItem.quantity}
                                        readOnly
                                        className="border py-2 px-5 rounded-md text-center w-28"
                                    />
                                    <Form method="put" className="flex gap-2">
                                        <input type="hidden" name="productId" value={cartItem.id} />
                                        <input type="hidden" name="quantity" value={cartItem.quantity + 1} />
                                        <button className="border px-5 rounded-md" type="submit">
                                            +
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <p className="text-3xl">{convertToIDR(cartItem.totalPrice)}</p>
                            <Form method="delete" className="flex gap-2">
                                <input type="hidden" name="productId" value={cartItem.id} />
                                <button type="submit">
                                    <Trash className="w-8 h-8 text-red-500" />
                                </button>
                            </Form>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
