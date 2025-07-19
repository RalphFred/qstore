"use client"

import { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import { DeliveryForm } from "@/components/shared/DeliveryForm";
import ConfirmOrder from "@/components/shared/ConfirmOrder";
import { MapPin, CreditCard } from "lucide-react";
import { CompactStepper } from "@/components/ui/stepper-component";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleDeliveryFormSubmit = () => {
    setCurrentStep(2);
  };

  const handleBackToDelivery = () => {
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="wrapper pt-6 pb-12">
            <div className="mb-6 text-lg font-semibold flex items-center gap-2">
              <MapPin size={20} /> <span>Delivery Information</span>
            </div>
            <DeliveryForm onSubmit={handleDeliveryFormSubmit} />
          </div>
        );
      case 2:
        return (
          <div className="wrapper pt-6 pb-12">
            <div className="mb-6 text-lg font-semibold flex items-center gap-2">
              <CreditCard size={20} /> <span>Confirm Order</span>
            </div>
            <ConfirmOrder onBack={handleBackToDelivery} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="wrapper border-b border-gray-200 flex justify-between items-center py-4 bg-white w-full">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="font-semibold">Checkout</h1>
        </div>
        <div className="">
          <CompactStepper currentStep={currentStep} onStepChange={setCurrentStep} />
        </div>
      </div>

      {renderStepContent()}
    </div>
  );
}
