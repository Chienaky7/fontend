"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react"
import { usePublicFetch } from '@/lib/getData'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency.client";

interface Prop {
    readonly productId: string;
}
export default function ProductPage({ productId }: Prop) {
    const dispatch = useDispatch();
    const { data, error } = usePublicFetch<{ result: IProduct }>(`/product/${productId}`);
    const product = data?.result;
    const [img, setImg] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (product) {
            setImg(product.images[0].name)
        }
    }, [product])

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    if (error) return <div>Error loading products</div>;
    if (!product) return <div>Loading...</div>;

    const thumbnails = product?.images.map((img) => img) || []

    const handleAddToCart = () => {
        dispatch(addToCart({ id: product.id, name: product.name, price: product.price, quantity, image: product.images[0].name }));
    };


    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <Card className="overflow-hidden p-6 flex items-center justify-center bg-white">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/image/${img}`}
                            alt="Yellow Summer Travel Bag"
                            width={400}
                            height={400}
                            loading="lazy"
                        />
                    </Card>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {thumbnails.map((thumb, index) => (
                            <button key={thumb.name} onClick={() => setImg(thumb.name)} className="border rounded-md p-1 min-w-[70px] flex-shrink-0 hover:border-primary">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/image/${thumb.name}`}
                                    alt={`Product thumbnail ${index + 1}`}
                                    width={70}
                                    height={70}
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-bold">{product?.name}</h1>
                        <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleFavorite}>
                            <Heart className={`h-6 w-6 ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                        </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold">{formatCurrency(product.price)}</span>
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">30% off</span>
                        <div className="flex items-center bg-amber-500 text-white px-2 py-0.5 rounded text-sm">
                            <span className="mr-1">★</span>
                            <span>4.8</span>
                        </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-none">
                                <Minus className="h-4 w-4" />
                            </Button>
                            <div className="w-12 text-center">{quantity}</div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={incrementQuantity}
                                className="h-10 w-10 rounded-none text-primary"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <Button onClick={handleAddToCart} variant="outline" className="flex-1 bg-muted/30">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add To Cart
                        </Button>
                    </div>

                    {/* Buy Now Button */}
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Buy Now</Button>
                </div>
            </div>

            <p>{product.description}</p>
        </div>
    )
}

