import Image from "next/image";

export default function PreviewCard() {
  return (
    <div className="w-full max-w-[200px] h-[250px]">
      <Image src="/images/products/product-1(0).webp" alt="Preview Card" width={100} height={100} className="w-full h-full object-cover rounded-lg" />
      <div className="text-sm font-light text-accent mt-2">
        Featured
      </div>
      <div className="font-medium mt-1 truncate">
        Anistone Hi Leather Biker Boots
      </div>
      <div className="flex items-center gap-1 mt-1">
        <div className="font-semibold text-lg">
        ₦135,000
        </div>
        <div className="text-sm font-light text-gray-500 line-through">
        ₦150,000
        </div>
      </div>
    </div>  
  );
}