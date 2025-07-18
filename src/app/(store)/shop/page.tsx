import ShopHeader from "@/components/shared/ShopHeader";
import ShopShelf from "@/components/shared/ShopShelf";

export default function Shop() {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <ShopHeader />
      <ShopShelf />
    </div>
  );
}