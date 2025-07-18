import { products } from "@/app/constants";
import PreviewCard from "./PreviewCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomeFeatured() {
  return (
    <div className="wrapper space-y-4 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured</h2> 
        <Link href="/shop">
          <Button variant="link" className="text-sm text-primary">
            View All
          </Button>
        </Link>
      </div>
      <div className="flex gap-2 mt-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-4">
        {products
          .filter(product => product.isFeatured)
          .slice(0, 5)
          .map((product) => (
            <PreviewCard key={product.id} product={product} fixedWidth={true} forceLabel="FEATURED" />
          ))}
      </div>
    </div>
  );
}