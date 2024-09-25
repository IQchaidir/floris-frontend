import { Link } from "react-router-dom"
import { Product } from "../../types"

export function ProductsGrid({ products }: { products: Product[] }) {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
                <li key={product.id}>
                    <Link to={`/products/${product.slug}`}>
                        <div>{product.name}</div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
