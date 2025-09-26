import Image from "next/image";
import { SimpleProduct } from "../../data/product";

interface ProductCardProps {
  product: SimpleProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.id} className="group cursor-pointer">
      <div className=" rounded-2xl p-3 ">
        <div className="border border-gray-200 w-full mb-3 sm:mb-4 rounded-2xl overflow-hidden aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-contain p-1 "
          />
        </div>
        
        <div className="space-y-1 px-2">
          <h3 className="text-[#565355] text-xs sm:text-sm font-medium line-clamp-2 leading-tight whitespace-nowrap">
            {product.name}
          </h3>
          <p className="font-semibold text-sm sm:text-base text-[#242123]">
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;