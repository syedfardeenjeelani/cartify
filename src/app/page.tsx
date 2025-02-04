"use client";
import { useSelector } from "react-redux";
import {
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "./services/productApi";
import Card from "./components/Card";
import { useState, useEffect } from "react";

export default function Home() {
  const filters = useSelector((state: any) => state.filters);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchProductsQuery({ query: filters.query }, { skip: !filters.query });

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetProductsByCategoryQuery(filters.category, {
      skip: !filters.category,
    });

  const { data: allProductsData, isLoading: isAllProductsLoading } =
    useGetProductsQuery(undefined, {
      skip: filters.category || filters.query,
    });

  useEffect(() => {
    let results = [];

    if (filters.category && filters.query) {
      const categoryProducts = categoryData?.products || [];
      results = categoryProducts.filter(
        (product: any) =>
          product.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.query.toLowerCase()) ||
          product.brand?.toLowerCase().includes(filters.query.toLowerCase())
      );
    } else if (filters.category) {
      results = categoryData?.products || [];
    } else if (filters.query) {
      results = searchData?.products || [];
    } else {
      results = allProductsData?.products || [];
    }

    const priceFiltered = results.filter(
      (product: any) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    setFilteredProducts(priceFiltered);
  }, [
    filters.query,
    filters.category,
    categoryData,
    searchData,
    allProductsData,
    filters.minPrice,
    filters.maxPrice,
  ]);

  const isLoading =
    isSearchLoading || isCategoryLoading || isAllProductsLoading;

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
