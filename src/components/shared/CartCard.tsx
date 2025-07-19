"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency, formatDiscountedPrice } from "@/lib/utils";

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    discounted: number;
    image: string[];
    description?: string;
    rating?: number;
    reviews?: number;
    category?: string;
    isFeatured?: boolean;
    isNew?: boolean;
    isBestSeller?: boolean;
  };
  quantity: number;
}

interface CartCardProps {
  item: CartItem;
}

export default function CartCard({ item }: CartCardProps) {
  const { removeFromCart, updateQuantity } = useCartStore();
  
  const { product, quantity } = item;
  
  // Calculate prices
  const isDiscounted = product.discounted > 0;
  const finalPrice = isDiscounted ? product.price - product.discounted : product.price;
  const pricing = isDiscounted 
    ? formatDiscountedPrice(product.price, product.discounted, "NGN", "en-NG")
    : null;
  const regularPrice = formatCurrency(product.price, "NGN", "en-NG");
  const displayPrice = formatCurrency(finalPrice, "NGN", "en-NG");

  // Handlers
  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 relative p-4">
      <div className="flex gap-4 pb-4 border-b">
        {/* Remove Button */}
        <button 
          onClick={handleRemove}
          className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={product.image[0]} 
            alt={product.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2 pr-8">
          {/* Product Name */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
              {product.name}
            </h3>
          </div>
          <div>
            {product.category && (
              <span className="text-gray-500 text-xs">
                {product.category}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3">
        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-900">
            {displayPrice}
          </span>
          {isDiscounted && (
            <>
              <span className="text-gray-400 line-through text-sm">
                {regularPrice}
              </span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                -{pricing!.discountPercentage}%
              </span>
            </>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-lg min-w-[2rem] text-center">
            {quantity}
          </span>
          <button 
            onClick={handleIncrement}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
