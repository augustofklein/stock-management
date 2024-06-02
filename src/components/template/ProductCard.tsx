/* eslint-disable @next/next/no-img-element */
import Product from "@/model/Product";

interface ProductProps {
    product: Product;
}

export default function ProductCard(props: ProductProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mt-4 mr-4">
            <img className="w-full" src="../../../images/no-image.png" alt="Product Image"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">ID: {props.product.id}</div>
                <div className="text-gray-700 text-xl mb-2">Description: {props.product.description}</div>
                <div className="text-gray-700 text-base">Stock: {props.product.stock}</div>
            </div>
        </div>
    );
  };