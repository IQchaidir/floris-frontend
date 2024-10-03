import { ShoppingBag, ShoppingCart, Trash, X } from "lucide-react"
import { useState } from "react"

export function CartRoute() {
    const [quantity, setQuantity] = useState(0)

    const handleDecrease = () => {
        if (quantity > 0) {
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

    return (
        <main className="px-32">
            <div className="pt-20 space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Your Cart</p>
                    <div className="flex gap-5">
                        <div className="text-end text-xl text-gray-500">
                            <p>Subtotal</p>
                            <p>Rp 100.000</p>
                        </div>
                        <button className="flex gap-2 items-center bg-[#F8BA8C] text-[#00634B] px-5 rounded-md">
                            <ShoppingBag /> <span className="text-lg font-semibold">CHECKOUT</span>
                        </button>
                    </div>
                </div>
                <div className="border p-5 rounded-md flex justify-between">
                    <div className="flex gap-10 items-center">
                        <div>
                            <img
                                src="https://via.placeholder.com/150"
                                className="w-48 h-48 object-cover bg-[#00634B] rounded-md"
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-bold">PLANTAE</p>
                            <p className="text-xl text-gray-500">Price Rp 10.0000</p>
                            <div className="flex gap-3 text-lg pt-2">
                                <button className="border px-5 rounded-md" onClick={handleDecrease}>
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={handleChange}
                                    className="border py-2 px-5 rounded-md text-center w-28"
                                />
                                <button className="border px-5 rounded-md" onClick={handleIncrease}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-20">
                        <p className="text-4xl">Rp 10.0000</p>

                        <button>
                            <Trash className="w-8 h-8 text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
