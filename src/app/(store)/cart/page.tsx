"use client";

import BackButton from "@/components/ui/BackButton";
import CartCard from "@/components/shared/CartCard";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bitcoin, Box, Package, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Suggestions from "@/components/shared/Suggestions";

export default function Cart() {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const formattedTotal = formatCurrency(totalPrice, "NGN", "en-NG");

  return (
    <div className="pb-18 bg-neutral-100 min-h-screen">
      <div className="wrapper border-b border-gray-200 flex justify-between items-center py-4 bg-white">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="font-semibold">Cart ({totalItems})</h1>
        </div>
        <div>
          <span className="text-sm">Total:</span> <span className="font-semibold">{formattedTotal}</span>
        </div>
      </div>

      <div className="wrapper bg-gray-100 py-4">
        {cart.length > 0 ? (
          <div className="space-y-4">
            {/* Cart Items */}
            {cart.map((item) => (
              <CartCard key={item.product.id} item={item} />
            ))}

            <div className="wrapper border-y py-4 space-y-2">
              <div className="flex items-center gap-2 text-neutral-700">
              <Bitcoin /> <span>Payment with Crypto Avaliable</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
              <Truck /> <span>Free returns within 7 days</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
              <Package /> <span>Free Shipping on orders over ₦100,000</span>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-xl border border-gray-200 mt-6">              
              <div className="space-y-2">
                <Button className="w-full h-12" asChild>
                  <Link href="/checkout">
                  Proceed to Checkout - <span className="font-semibold text-base">{formattedTotal}</span>
                  </Link>
                </Button>
              </div>
            </div>

            <Suggestions />
          </div>
        ) : (
          // Empty Cart State
          <>
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Image src="/images/empty-cart.png" alt="Empty Cart" width={100} height={100} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Cart is Empty</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
              Start adding products to your cart to see them here. Browse our amazing products!
            </p>
            <Link href="/shop">
              <Button className="px-6 py-2">
                Continue Shopping
              </Button>
            </Link>
          </div>
          <Suggestions />
          </>
        )}
      </div>
    </div>
  );
}
