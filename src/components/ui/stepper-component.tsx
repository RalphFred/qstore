"use client"

import { useState } from "react"
import { Stepper, StepperItem, StepperTrigger } from "./stepper"

export function StepperExample() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { step: 1, title: "Delivery Details" },
    { step: 2, title: "Payment" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <Stepper currentStep={currentStep} onStepChange={setCurrentStep}>
        {steps.map(({ step, title }) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger step={step}>
              {title}
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
      
      {/* Example content for current step */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Step {currentStep}: {steps.find(s => s.step === currentStep)?.title}
        </h3>
        <p className="text-gray-600">
          This is the content for step {currentStep}. Click on any step above to navigate.
        </p>
      </div>
    </div>
  )
}

// Alternative usage - more compact without labels
export function CompactStepper({ 
  currentStep, 
  onStepChange 
}: {
  currentStep?: number;
  onStepChange?: (step: number) => void;
}) {
  const [internalStep, setInternalStep] = useState(1);
  const totalSteps = 2;

  // Use controlled or uncontrolled mode
  const activeStep = currentStep ?? internalStep;
  const handleStepChange = onStepChange ?? setInternalStep;

  return (
    <div className="w-full">
      <Stepper currentStep={activeStep} onStepChange={handleStepChange}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <StepperItem key={i + 1} step={i + 1}>
            <StepperTrigger step={i + 1} />
          </StepperItem>
        ))}
      </Stepper>
    </div>
  )
}
  