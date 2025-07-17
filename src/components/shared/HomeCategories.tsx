import { categories } from "@/app/constants";

export default function HomeCategories() {
  return (
    <div className="wrapper">
      <h1 className="text-xl font-semibold">Categories</h1>
      
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {categories.map((category, index) => (
            <div key={index} className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-500">
                <h2>{category}</h2>
            </div>
        ))}
      </div>
    </div>
  );
}