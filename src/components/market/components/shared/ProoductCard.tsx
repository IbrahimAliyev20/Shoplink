import Image from "next/image";
import Link from "next/link";
import { ProductStoreCategory } from "@/types/storeforusers/types";

interface ProductCardProps {
  product: ProductStoreCategory;
  storeSlug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, storeSlug }) => {
  return (
    <Link href={`/${storeSlug}/${product.slug}`} className="block">
      <div className="group cursor-pointer">
        <div className=" rounded-2xl">
          <div className="border border-[#F3F2F8] w-full mb-3 sm:mb-4 rounded-2xl overflow-hidden aspect-square">
            <Image
              src={product.thumb_image}
              alt={`${product.name} - ${product.detail.sales_price || "0"} AZN məhsul şəkli`}
              width={400}
              height={400}
              className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
              quality={85}
            />
          </div>
          
          <div className="space-y-1 px-2">
            <h3 className="text-[#565355] text-xs sm:text-sm font-medium line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>
            <p className="font-semibold text-sm sm:text-base text-[#242123]">
              {product.detail.sales_price || "0"} AZN
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;