import { Link } from "react-router-dom"
import { Product } from "../../types"
import { convertToIDR } from "../../libs/currency"

export function ProductsGrid({ products }: { products: Product[] }) {
    return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 pt-14">
            {products.map((product) => (
                <li key={product.id} className="hovtransition-transform duration-300 hover:scale-110">
                    <Link to={`/products/${product.slug}`}>
                        <div className="border-4 border-[#F8BA8C] w-[250px] rounded-lg bg-[#F8BA8C]">
                            <div>
                                <img
                                    src={product.imageURL}
                                    alt={product.name}
                                    className="w-full h-[300px] rounded-md rounded-b-none"
                                />
                            </div>

                            <div className="py-2 px-2">
                                <h4 className="text-lg font-bold">{product.name}</h4>
                                <p>{convertToIDR(product.price)}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
