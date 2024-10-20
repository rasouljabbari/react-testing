import { useEffect, useState } from "react"
import { Product } from "../entities"

export default function ProductDetail({ productId }: { productId: number }) {
    const [product, setProduct] = useState<Product>({} as Product)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!productId) {
            setError(new Error("Invalid productId"))
            return
        }

        setIsLoading(true)
        fetch("/products/" + productId)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    if (!product) return <p>The given product was not found</p>;

    return (
        <>
            <h1>Product Detail</h1>
            <h2>Name : {product.name}</h2>
            <h3>Price : ${product.price}</h3>
        </>
    )
}
