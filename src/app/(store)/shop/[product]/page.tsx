import { products } from "@/app/constants";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import ProductGallery from "@/components/shared/ProductGallery";
import { formatCurrency, formatDiscountedPrice } from "@/lib/utils";
import { Box, Plus, Minus, Star, Truck, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: productId } = await params;
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  let label = "";
  let labelClass = "";
  if (product?.isNew) {
    label = "NEW";
    labelClass = "text-red-500";
  } else if (product?.isBestSeller) {
    label = "BESTSELLER";
    labelClass = "text-accent";
  } else if (product?.isFeatured) {
    label = "FEATURED";
    labelClass = "text-primary";
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Format pricing
  const isDiscounted = product.discounted > 0;
  const pricing = isDiscounted
    ? formatDiscountedPrice(product.price, product.discounted, "NGN", "en-NG")
    : null;
  const regularPrice = formatCurrency(product.price, "NGN", "en-NG");

  return (
    <div className="pb-32 bg-neutral-100">
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
        <div className="w-12 h-12 bg-primary text-lg text-white rounded-lg flex items-center justify-center cursor-pointer">
          <Minus />
        </div>
        <div className="flex-1"><Input type="number" className="text-lg w-full h-12 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"/></div>
        <div className="w-12 h-12  bg-primary text-lg text-white rounded-lg flex items-center justify-center cursor-pointer">
          <Plus />
        </div>
      </div>

      <div className="wrapper py-4 flex items-center gap-2">
        <Button className="flex-1 text-lg h-12">Add to Cart</Button>
        <Button variant="outline" className="text-lg h-12 w-12"><Heart className="size-6 text-primary" /></Button>
      </div>
    </div>
  );
}
