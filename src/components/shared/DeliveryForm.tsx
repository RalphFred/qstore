"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import PhoneInput from "@/components/ui/phone-input"
import { useUserDetailsStore } from "@/stores/user-details-store"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").max(15),
  address: z.string().min(5, "Address must be at least 5 characters.").max(100),
})

interface DeliveryFormProps {
  onSubmit?: () => void;
}

export function DeliveryForm({ onSubmit }: DeliveryFormProps) {
  const { userDetails, setUserDetails, clearUserDetails, hasUserDetails } = useUserDetailsStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  // Pre-fill form with saved user details
  useEffect(() => {
    if (hasUserDetails()) {
      form.reset(userDetails);
    }
  }, [userDetails, form, hasUserDetails]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Save user details to store
    setUserDetails(values);
    console.log("User details saved:", values);
    
    // Call the parent's onSubmit callback to advance to next step
    onSubmit?.();
  }

  function handleClearDetails() {
    clearUserDetails();
    form.reset({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  }

  return (
    <div className="space-y-4">
      {hasUserDetails() && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-green-800">
                <span className="font-semibold">Saved details found!</span> Your information has been pre-filled.
              </p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleClearDetails}
              className="text-green-700 border-green-300 hover:bg-green-100"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ralph Fred" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="ralphfred@gmail.com" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, Lagos, Nigeria" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full text-lg font-semibold h-12">
            {hasUserDetails() ? "Continue" : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  )
}