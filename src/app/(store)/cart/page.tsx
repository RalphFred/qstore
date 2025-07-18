import BackButton from "@/components/ui/BackButton";
import CartCard from "@/components/shared/CartCard";

export default function Cart() {
  return (
    <div className="">
      <div className="wrapper border-b border-gray-200 flex justify-between items-center py-4 bg-white">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="font-semibold">Cart</h1>
        </div>
        <div>
          <span className="text-sm text-gray-500">
            Total: <span className="font-semibold text-lg text-black">₦0</span>
          </span>
        </div>
      </div>

      <div className="wrapper bg-gray-100">
        <CartCard />
      </div>
    </div>
  );
}
