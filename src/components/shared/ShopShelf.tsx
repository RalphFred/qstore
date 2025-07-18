"use client";

import React, { useState } from "react";
import { categories, products } from "@/app/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreviewCard from "./PreviewCard";

export default function ShopShelf() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "ALL" || !selectedCategory
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="">
      {/* filter */}
      <div className="py-4 border-b border-gray-300 wrapper">
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            {["ALL", ...categories].map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* products */}
      <div className="wrapper py-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <PreviewCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
