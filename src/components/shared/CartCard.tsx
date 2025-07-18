import Image from "next/image";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartCardProps } from "@/app/types";


export default function CartCard({
  productName = "iPhone 16 Pro Max (256GB)",
  brand = "Apple",
  color = "Pink",
  unitsLeft = 20,
  originalPrice = 5000,
  discountedPrice = 1905000,
  discountPercentage = 21,
  quantity = 1,
  image = "/images/products/product-3(0).webp"
}: CartCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 relative">
      {/* Remove button */}
      <button className="absolute top-4 right-4 ">
        <Trash2 className="w-5 h-5 text-red-500"  />
      </button>

      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={image} 
            alt={productName}
            width={150}
        height={150}
            className="w-48 h-48 object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2">
          {/* Product Name & Brand */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{productName}</h3>
            <p className="text-gray-500 text-sm">{brand}</p>
          </div>

          {/* Color & Stock */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{color}</span>
            <span className="text-gray-500">{unitsLeft} units left</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">
              ₦{discountedPrice.toLocaleString()}
            </span>
            <span className="text-gray-400 line-through text-sm">
              ₦{originalPrice.toLocaleString()}
            </span>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-3">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}