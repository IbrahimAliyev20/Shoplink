import { SimpleProduct } from "../../data/product";
import ProductCard from "./ProoductCard";

interface ProductListProps {
  products: SimpleProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {products.length === 0 && (
        <div className="col-span-full text-center py-8 sm:py-10">
          <p className="text-gray-500 text-sm sm:text-base">Bu kateqoriyada məhsul tapılmadı.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;