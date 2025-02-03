"use client";
import { useGetProductsQuery } from "./services/productApi";
import Card from "./components/Card";

export default function Home() {
  const { data, isLoading, isError } = useGetProductsQuery();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {data?.products?.map((product: any) => (
          <Card key={product.id} product={product} onAddToCart={product.id} />
        ))}
      </div>
    </div>
  );
}
