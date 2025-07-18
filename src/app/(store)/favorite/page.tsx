"use client";
import BackButton from "@/components/ui/BackButton";
import { useFavoriteStore } from "@/stores/favorite-store";
import PreviewCard from "@/components/shared/PreviewCard";
import Suggestions from "@/components/shared/Suggestions";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Favorite() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="pb-18">
      <div className="wrapper border-b border-gray-200 flex gap-2 items-center py-4 bg-white">
        <BackButton />
        <h1 className="font-semibold">Favorites</h1>
      </div>

      <div className="wrapper py-4">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2 mb-4">
            {favorites.map((product) => (
              <PreviewCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
            <Image src="/images/empty-favorite.jpg" alt="Empty Heart" width={200} height={200} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Start adding products to your favorites to see them here. Tap the heart icon on any product!
            </p>
            <Link href="/shop">
              <Button className="px-6 py-4 text-lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Suggestions />
    </div>
  );
}
