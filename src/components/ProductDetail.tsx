import { Product } from "../entities"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ProductDetail({ productId }: { productId: number }) {
    const {
        data: product,
        error,
        isLoading,
      } = useQuery<Product, Error>({
        queryKey: ["products",productId],
        queryFn: () => axios.get<Product>("/products/" + productId).then((res) => res.data),
      });

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
