"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StepperContextValue {
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

const StepperContext = React.createContext<StepperContextValue | undefined>(undefined)

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("Stepper components must be used within a Stepper")
  }
  return context
}

interface StepperProps {
  currentStep: number
  onStepChange?: (step: number) => void
  children: React.ReactNode
  className?: string
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ currentStep, onStepChange, children, className, ...props }, ref) => {
    const [internalStep, setInternalStep] = React.useState(currentStep)
    
    const totalSteps = React.Children.count(children)
    
    const handleStepChange = (step: number) => {
      setInternalStep(step)
      onStepChange?.(step)
    }

    const contextValue: StepperContextValue = {
      currentStep: onStepChange ? currentStep : internalStep,
      setCurrentStep: handleStepChange,
      totalSteps,
    }

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("flex items-center justify-between w-full", className)}
          {...props}
        >
          {children}
        </div>
      </StepperContext.Provider>
    )
  }
)
Stepper.displayName = "Stepper"

interface StepperItemProps {
  step: number
  children: React.ReactNode
  className?: string
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, children, className, ...props }, ref) => {
    const { currentStep, totalSteps } = useStepperContext()
    const isActive = step === currentStep
    const isCompleted = step < currentStep
    const isLast = step === totalSteps

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          !isLast && "flex-1",
          className
        )}
        {...props}
      >
        {children}
        {!isLast && (
          <StepperSeparator 
            isCompleted={isCompleted || isActive} 
            className="flex-1" 
          />
        )}
      </div>
    )
  }
)
StepperItem.displayName = "StepperItem"

interface StepperTriggerProps {
  step: number
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ step, children, className, disabled, ...props }, ref) => {
    const { currentStep, setCurrentStep } = useStepperContext()
    const isActive = step === currentStep
    const isCompleted = step < currentStep

    const handleClick = () => {
      if (!disabled) {
        setCurrentStep(step)
      }
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        <StepperIndicator step={step} isActive={isActive} isCompleted={isCompleted} />
        {children && (
          <span className={cn(
            "ml-2 text-sm font-medium transition-colors",
            isActive ? "text-primary/80" : "text-gray-500",
            isCompleted && "text-green-600"
          )}>
            {children}
          </span>
        )}
      </button>
    )
  }
)
StepperTrigger.displayName = "StepperTrigger"

interface StepperIndicatorProps {
  step: number
  isActive?: boolean
  isCompleted?: boolean
  className?: string
}

const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ step, isActive, isCompleted, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
          isCompleted 
            ? "bg-green-600 border-green-600 text-white" 
            : isActive 
            ? "bg-primary/80 border-primary/80 text-white" 
            : "bg-white border-gray-300 text-gray-500",
          className
        )}
        {...props}
      >
        {isCompleted ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-sm font-medium">{step}</span>
        )}
      </div>
    )
  }
)
StepperIndicator.displayName = "StepperIndicator"

interface StepperSeparatorProps {
  isCompleted?: boolean
  className?: string
}

const StepperSeparator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
  ({ isCompleted, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-0.5 mx-4 transition-colors",
          isCompleted ? "bg-green-600" : "bg-gray-300",
          className
        )}
        {...props}
      />
    )
  }
)
StepperSeparator.displayName = "StepperSeparator"

export {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
} 