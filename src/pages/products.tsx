import Layout from "@/components/template/Layout";
import ProductCard from "@/components/template/ProductCard";
import ProductModal from "@/components/template/ProductModal";
import Product from "@/model/Product";
import { useEffect, useState } from "react";

export default function Products() {

    const [products, setProducts] = useState<Product[]>();
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

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

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleReloadProducts = async () => {
        await fetchProducts();
    };

    const handleEdit = () => {
        // Handle edit functionality, such as opening a modal with the product details
    };
    
    const handleDelete = async (productId: string) => {
        try {
            const response = await fetch(`https://stock-management-backend-ten.vercel.app/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                console.error('Failed to delete product');
            } else {
                handleReloadProducts();
            }
        } catch (error) {
            console.error('An error occurred while deleting the product:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }
  
    return (
        <Layout title="Products" subtitle="Aqui você irá gerenciar os seus produtos!">
            <div>
                <button className={`
                    bg-blue-500 hover:bg-blue-400
                    text-white rounded-lg px-4 py-3
                `} onClick={openModal}>
                    Add Product
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {products ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} handleDelete={handleDelete} handleEdit={handleEdit} />
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
                <ProductModal openModal={isModalOpen} closeModal={closeModal} handleSubmit={handleReloadProducts}/>
            </div>
        </Layout>
    )
}
