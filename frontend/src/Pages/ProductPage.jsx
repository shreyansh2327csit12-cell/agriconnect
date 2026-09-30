import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFarmProducts } from "../http/api";

export default function ProductPage() {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getFarmProducts();
                console.log("69",response.data);
                const data = response.data.products;
                console.log(data)
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-background p-6">
            <h1 className="text-2xl font-bold text-center text-foreground mb-6">Product Page</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products?.map((product) => (
                    <Card key={product._id} className="shadow-lg border dark:border-gray-700 dark:bg-gray-800">
                        <CardContent className="p-4 space-y-4">
                            <img 
                                src={product.imageUrl} 
                                alt={product.title} 
                                className="w-full h-40 object-cover rounded-lg dark:border-gray-600" 
                            />
                            <h3 className="font-bold text-lg">{product.title}</h3>
                            <div className="flex items-center">
                                <span className="text-yellow-500">{'★'.repeat(product.rating)}</span>
                                <span className="text-gray-400">{'☆'.repeat(5 - product.rating)}</span>
                            </div>
                            <p className="text-foreground dark:text-gray-200">{product.description}</p>
                            <p className="text-lg font-semibold text-foreground dark:text-gray-100">₹{product.price}</p>
                            <a href={`${product.link}`} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full dark:hover:bg-primary/90">Buy on Amazon</Button>
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
