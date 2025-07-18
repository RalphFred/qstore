import { products } from "@/app/constants";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import ProductGallery from "@/components/shared/ProductGallery";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: productId } = await params;
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="">
      <div className="wrapper border-b border-gray-200 flex gap-2 items-center py-4 bg-white">
        <BackButton />
        <h1 className="font-semibold">Details</h1>
      </div>
      <div className="wrapper py-y">
        <ProductGallery images={product.image} productName={product.name} />
      </div>

      {/* <h1>Product Page {product.name}</h1>
      <Image
        src={product.image[0]}
        alt={product.name}
        width={500}
        height={500}
      /> */}
    </div>
  );
}
