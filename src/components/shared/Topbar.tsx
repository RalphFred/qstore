import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className="wrapper py-2">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-12 h-12"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/favorite">
            <div className="p-2 bg-purple-2 rounded-full">
              <Heart size={20} className="text-primary" />
            </div>
          </Link>
          <Link href="/cart">
            <div className="p-2 bg-purple-2 rounded-full">
              <ShoppingCart size={20} className="text-primary" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
