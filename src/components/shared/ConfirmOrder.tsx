"use client"

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useUserDetailsStore } from "@/stores/user-details-store";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, MapPin, User, Phone, Mail } from "lucide-react";
import Image from "next/image";

interface ConfirmOrderProps {
  onBack?: () => void;
}

export default function ConfirmOrder({ onBack }: ConfirmOrderProps) {
  const { cart, getTotalPrice, clearCart } = useCartStore();
  const { userDetails } = useUserDetailsStore();
  
  const totalPrice = getTotalPrice();
  const formattedTotal = formatCurrency(totalPrice, "NGN", "en-NG");

  const handlePlaceOrder = () => {
    // Here you would typically submit the order to your backend
    console.log("Placing order:", { cart, userDetails, totalPrice });
    
    // Clear cart after successful order
    clearCart();
    
    // You could navigate to a success page here
    alert("Order placed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      {onBack && (
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Delivery Details
        </Button>
      )}

      {/* Delivery Information Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Delivery Information
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span>{userDetails.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{userDetails.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{userDetails.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{userDetails.address}</span>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
        <div className="space-y-3">
          {cart.map((item) => {
            const finalPrice = item.product.discounted > 0 
              ? item.product.price - item.product.discounted 
              : item.product.price;
            const itemTotal = finalPrice * item.quantity;
            
            return (
              <div key={item.product.id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                <Image 
                  src={item.product.image[0]} 
                  alt={item.product.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.product.name}</h4>
                  <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatCurrency(itemTotal, "NGN", "en-NG")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>{formattedTotal}</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <Button 
        onClick={handlePlaceOrder}
        className="w-full text-lg font-semibold h-12"
        size="lg"
      >
        Place Order - {formattedTotal}
      </Button>
    </div>
  );
}