import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";
import { Product } from "@/data/products";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  onBuy?: (product: Product) => void;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    );
  }
  return stars;
};

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row items-start gap-x-6 gap-y-4 p-4 border-b last:border-b-0 bg-white">
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 mx-auto md:mx-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-md"
        />
      </div>
      {/* Details and Actions */}
      <div className="flex flex-col flex-grow w-full">
        {/* Top row: Name and Stars */}
        <div className="flex items-start justify-between w-full mb-1">
          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          <div className="flex items-center">{renderStars(product.rating)}</div>
        </div>
        {/* Features */}
        <ul className="mb-4 space-y-1.5">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {/* Price and Buy Button Row */}
        <div className="flex flex-row items-center gap-3 mt-auto">
          <span className="text-xl font-bold text-gray-800 min-w-[100px]">{product.priceDescription}</span>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white ml-auto w-full sm:w-auto" onClick={() => router.push(`/products/checkout/${product.id}`)}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}