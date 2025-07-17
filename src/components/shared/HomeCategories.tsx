import { categories } from "@/app/constants";
import PreviewCard from "./PreviewCard";

export default function HomeCategories() {
  return (
    <div className='wrapper'>
      <h2 className='text-xl font-semibold'>Categories</h2>
      
      <div className="flex gap-2 mt-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-4">
        {categories.map((category, index) => (
            <div key={index} className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-500 shrink-0">
                <h2>{category}</h2>
            </div>
        ))}
      </div>

      <PreviewCard />
    </div>
  );
}