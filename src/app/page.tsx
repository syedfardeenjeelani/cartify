"use client";
import { useSelector } from "react-redux";
import {
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} from "./services/productApi";
import Card from "./components/Card";

export default function Home() {
  const filters = useSelector((state: any) => state.filters);

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchProductsQuery(
      { query: filters.query },
      { skip: !!filters.category }
    );

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetProductsByCategoryQuery(filters.category, {
      skip: !filters.category,
    });

  const products = filters.category
    ? categoryData?.products
    : searchData?.products;

  const filteredProducts = products?.filter((product: any) => {
    return (
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );
  });

  const isLoading = isSearchLoading || isCategoryLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600 dark:text-gray-300">
          Loading products...
        </div>
      </div>
    );
  }

  if (!filteredProducts?.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600 dark:text-gray-300">
          No products found matching your filters.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.map((product: any) => (
          <Card key={product.id} product={product} onAddToCart={product.id} />
        ))}
      </div>
    </div>
  );
}
