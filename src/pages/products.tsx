import Layout from "@/components/template/Layout";
import ProductCard from "@/components/template/ProductCard";
import Product from "@/model/Product";
import { useEffect, useState } from "react";

export default function Products() {

    const [products, setProducts] = useState<Product[]>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://stock-management-backend-ten.vercel.app/products');
            
                if(!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error: any) {
                setError(error.message);
            }
        }

        fetchProducts();
    }, [])

    if (error) {
        return <div>Error: {error}</div>;
    }
  
    return (
        <Layout title="Products" subtitle="Aqui você irá gerenciar os seus produtos!">
            <div>
                <button className={`
                    bg-blue-500 hover:bg-blue-400
                    text-white rounded-lg px-4 py-3
                `}>
                    Add Product
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {products ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}
