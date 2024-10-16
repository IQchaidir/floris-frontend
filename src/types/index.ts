export type User = {
    id: string

    fullname?: string
    username: string
    email: string

    createdAt: Date
    updatedAt: Date

    totalCart: number
}

export type Product = {
    id: string

    slug: string
    name: string
    imageURL: string
    price: number
    description: string
    sku: string
    stock: number

    createdAt: Date
    updatedAt: Date
}

export type Cart = {
    id: string

    userId: string | null
    status: string

    items: CartItem[]

    createdAt: Date
    updatedAt: Date

    totalAmount: number
}

export type CartItem = {
    id: string

    quantity: number

    productId: string
    product: Product

    cartId: string

    createdAt: Date
    updatedAt: Date

    totalPrice: number
}
