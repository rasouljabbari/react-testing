import axios from "axios";
import { Product } from "../entities";
import { useEffect, useState } from "react";

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const {data} = await axios.get<Product[]>("/products");
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if(error instanceof Error) {
                    setError(error);
                } else {
                    setError(new Error("Unknown error"));
                }
            }
        }
        fetchProducts()
    }, []) 

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (products!.length === 0) return <p>No products available.</p>;

    return (
        <ul>
            {products!.map((product) => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    );
};

export default ProductList;