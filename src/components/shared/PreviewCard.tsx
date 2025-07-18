import { Product } from "@/app/types";
import { formatCurrency, formatDiscountedPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PreviewCardProps {
  product: Product;
  fixedWidth?: boolean;
  forceLabel?: "NEW" | "FEATURED" | "BESTSELLER" | "";
}

export default function PreviewCard({ product, fixedWidth = false, forceLabel }: PreviewCardProps) {
  // Compute the label to show and its color class
  let label = "";
  let labelClass = "";

  // Use forced label if provided, otherwise use hierarchy
  if (forceLabel !== undefined) {
    label = forceLabel;
    if (forceLabel === "NEW") {
      labelClass = "text-red-500";
    } else if (forceLabel === "BESTSELLER") {
      labelClass = "text-accent";
    } else if (forceLabel === "FEATURED") {
      labelClass = "text-primary";
    }
  } else {
    // Default hierarchy
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
  }
   // Format pricing
   const isDiscounted = product.discounted > 0;
   const pricing = isDiscounted
     ? formatDiscountedPrice(product.price, product.discounted, "NGN", "en-NG")
     : null;
   const regularPrice = formatCurrency(product.price, "NGN", "en-NG");

  // Dynamic width classes based on usage
  const widthClasses = fixedWidth 
    ? "w-[180px] flex-shrink-0" 
    : "w-full max-w-[200px]";

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className={widthClasses}>
      <Image src={product.image[0]} alt="Preview Card" width={500} height={500} className="w-full h-auto rounded-lg" />
      <div className={`text-sm font-semibold mt-2 min-h-[1.5em] ${labelClass}`}>
        {label}
      </div>
      <div className="font-medium mt-1 truncate">
        {product.name}
      </div>
      <div className="flex items-center gap-1 mt-1">
        {isDiscounted ? (
          <div className="font-semibold text-lg">
            {pricing!.finalPrice}
          </div>
        ) : (
          <div className="font-semibold text-lg">
            {regularPrice}
          </div>
        )}
        {isDiscounted && (
          <div className="text-xs font-semibold text-red-400  line-through">
            {pricing!.originalPrice}
          </div>
        )}
      </div>
    </div> 
    </Link>
  );
}