import BackButton from "../ui/BackButton";

export default function ShopHeader() {
  return (
    <div className="wrapper border-b border-gray-200 flex gap-2 items-center py-4 bg-white">
      <BackButton />
      <h1 className="font-semibold">Shop</h1>
    </div>
  );
}
