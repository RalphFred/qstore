import { MapPin } from "lucide-react";

export default function HomeTop() {
  return (
    <div className="wrapper bg-white flex justify-between items-center py-4">
      <div className="font-semibold text-xl">QStore</div>
      <div className="text-primary flex items-center gap-2">
        <MapPin className="w-4 h-4" /> Lagos, Nigeria
      </div>
    </div>
  );
}