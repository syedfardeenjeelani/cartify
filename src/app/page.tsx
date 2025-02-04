"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "./services/productApi";
import Card from "./components/Card";
import { useState, useEffect } from "react";
import { addItem } from "./redux/slices/cartSlice";

export default function Home() {
  const filters = useSelector((state: any) => state.filters);
  const [filteredProducts, setFilteredProducts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchProductsQuery(
      { query: filters.query },
      { skip: !filters.query, pollingInterval: 5000 }
    );

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetProductsByCategoryQuery(filters.category, {
      skip: !filters.category,
      pollingInterval: 5000,  
    });

  const { data: allProductsData, isLoading: isAllProductsLoading } =
    useGetProductsQuery(undefined, {
      skip: filters.category || filters.query,
      pollingInterval: 5000,
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
    setCurrentPage(1)
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
      <div className="min-h-screen  bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
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

  const onAddToCartFn = async (product: any) => {
    console.log(product,'aasdasdsa')
    try {
      dispatch(
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
          quantity: 1,
        })
      ); 
    } catch (error) {
      console.error("Faildde", error);
    }
  };

  const productsPerPage = 8;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startingIndex = (currentPage - 1) * productsPerPage;
  const endingIndex = startingIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startingIndex, endingIndex);

  return (
    <div className="min-h-screen py-5 bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {paginatedProducts.map((product: any) => (
          <Card
            key={product.id}
            product={product}
            onAddToCart={onAddToCartFn}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-2 rounded-md font-medium ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
