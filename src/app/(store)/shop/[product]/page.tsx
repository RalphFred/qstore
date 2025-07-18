"use client";

import { useState, useEffect } from "react";
import { products } from "@/app/constants";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import ProductGallery from "@/components/shared/ProductGallery";
import { formatCurrency, formatDiscountedPrice } from "@/lib/utils";
import { Box, Plus, Minus, Star, Truck, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useFavoriteStore } from "@/stores/favorite-store";
import { Product } from "@/app/types";
import { toast } from "sonner";

interface ProductPageProps {
  params: Promise<{ product: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Store hooks
  const { addToCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const resolvedParams = await params;
        const productId = parseInt(resolvedParams.product);
        const foundProduct = products.find(p => p.id === productId);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params]);

  // Quantity handlers
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  // Action handlers
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart`);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      const wasInFavorites = isFavorite(product.id);
      toggleFavorite(product);
      
      if (wasInFavorites) {
        toast.info(`${product.name} removed from favorites`);
      } else {
        toast.info(`${product.name} added to favorites`);
      }
    }
  };

  if (loading) {
    return <div className="pb-32 bg-neutral-100 flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="pb-32 bg-neutral-100 flex items-center justify-center min-h-screen">Product not found</div>;
  }

  // Label logic
  let label = "";
  let labelClass = "";
  if (product.isNew) {
    label = "NEW";
    labelClass = "text-red-500";
  } else if (product.isBestSeller) {
    label = "BESTSELLER";
    labelClass = "text-accent";
  } else if (product.isFeatured) {
    label = "FEATURED";
    labelClass = "text-primary";
  }

  // Format pricing
  const isDiscounted = product.discounted > 0;
  const pricing = isDiscounted
    ? formatDiscountedPrice(product.price, product.discounted, "NGN", "en-NG")
    : null;
  const regularPrice = formatCurrency(product.price, "NGN", "en-NG");

  // Check if favorited
  const isProductFavorited = isFavorite(product.id);

  return (
    <div className="pb-18 bg-neutral-100">
      <div className="wrapper border-b border-gray-200 flex gap-2 items-center py-4 bg-white">
        <BackButton />
        <h1 className="font-semibold">Details</h1>
      </div>

      <div className="wrapper">
        <ProductGallery images={product.image} productName={product.name} />
      </div>

      <div className="wrapper space-y-2 mb-4">
        <div className={`font-semibold ${labelClass}`}>{label}</div>
        <h1 className="font-semibold text-xl">{product.name}</h1>

        {isDiscounted ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="font-bold text-2xl">{pricing!.finalPrice}</div>
              <div className="text-sm font-semibold text-gray-500 line-through">
                {pricing!.originalPrice}
              </div>
            </div>
            <div className="text-xs font-semibold text-red-500 bg-red-200 px-2 py-1 rounded-full">
              - {pricing!.discountPercentage}%
            </div>
          </div>
        ) : (
          <div className="font-bold text-2xl">{regularPrice}</div>
        )}

        <div className="text-neutral-800">
          {product.description}
        </div>

        <div className="flex items-center gap-2 font-semibold">
          <Star className="w-4 h-4 text-yellow-400" fill="currentColor" /> {product.rating}
        </div>
      </div>

      <div className="wrapper py-4 space-y-2 text-neutral-800 border-y border-y-neutral-200">
        <div className="flex items-center gap-2">
          <Box />
          <span>In Stock</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck />
          <span>Free Delivery</span>
        </div>
      </div>

      <div className="wrapper flex gap-2 py-4">
        <button 
          onClick={decrementQuantity}
          className="w-12 h-12 bg-primary text-lg text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <Minus />
        </button>
        <div className="flex-1">
          <Input 
            type="number" 
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="text-lg w-full h-12 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
        </div>
        <button 
          onClick={incrementQuantity}
          className="w-12 h-12 bg-primary text-lg text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <Plus />
        </button>
      </div>

      <div className="wrapper py-4 flex items-center gap-2">
        <Button onClick={handleAddToCart} className="flex-1 text-lg h-12">
          Add to Cart ({quantity})
        </Button>
        <Button 
          onClick={handleToggleFavorite}
          variant="outline" 
          className="text-lg h-12 w-12"
        >
          <Heart 
            className={`size-6 ${isProductFavorited ? 'text-primary fill-primary' : 'text-primary'}`} 
          />
        </Button>
      </div>
    </div>
  );
}
