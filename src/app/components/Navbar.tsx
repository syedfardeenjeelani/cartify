"use client";
import React, {useCallback, useEffect, useState } from "react";
import { ShoppingCart, Search, Menu, X, SlidersHorizontal } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setPriceRange,
  setQuery,
} from "../redux/slices/filterSlice";
import { 
  useGetProductsCategoriesQuery,
  useSearchProductsQuery,
} from "../services/productApi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state: any) => state.cart.items);
  const cartCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  const [showFilters, setShowFilters] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dispatch  = useDispatch();
  const filters = useSelector((state: any) => state.filters);
  //   console.log(filters,'//////////////////')
  const { data: categories } = useGetProductsCategoriesQuery();
  
  const { data: products } = useSearchProductsQuery({
    query: filters.query,
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const debouncedDispatch = useCallback(
    debounce((value :any) => {
      dispatch(setQuery(value));
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedDispatch(value);
    setHidden(false);
  };

  const handleCategorySelect = (selectedCategory: any) => {
    dispatch(
      setCategory(selectedCategory === filters.category ? "" : selectedCategory)
    );
  };

  const handlePriceChange = (type: "min" | "max", value :any) => {
    const newMin: any = type === "min" ? value : filters.minPrice;
    const newMax: any = type === "max" ? value : filters.maxPrice;
    dispatch(setPriceRange({ min: newMin, max: newMax }));
  };
  //   console.log(categories)

  //   return <h1>Testing</h1>
 
// console.log("carts number here ///////////",carts)

  const pathName = usePathname();
  console.log(pathName,'url is here')
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href='/'
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 
                           text-transparent bg-clip-text"
            >
              Cartify
            </Link>
          </div>

          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                // value={filters.query}
                onChange={handleSearch}
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 
                         focus:outline-none 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white
                         dark:placeholder-gray-400"
              />
              <div className="absolute right-3 top-2.5 flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                >
                  <SlidersHorizontal className="h-5 w-5 text-gray-400" />
                </button>
                <Search className="h-5 w-5 text-gray-400" />
              </div>

              {!hidden &&
                products?.products?.length > 0 &&
                filters.query.length >= 2 && (
                  <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    {products.products.slice(0, 5).map((result: any) => (
                      <div
                        key={result.id}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          // dispatch(setCategory(result.category));
                          dispatch(setQuery(result.title));
                          // dispatch(setQuery(""));
                          setHidden(!hidden);
                        }}
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {result.price}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {showFilters && pathName == '/' && (
              <div className="absolute mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) =>
                          handlePriceChange("min", Number(e.target.value))
                        }
                        className="w-24 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          handlePriceChange("max", Number(e.target.value))
                        }
                        className="w-24 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <DarkModeToggle />
            <Link href='/cart' className="relative group">
              <ShoppingCart
                className="h-6 w-6 text-gray-600 dark:text-gray-300 
                                    group-hover:text-blue-500 transition-colors"
              />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-blue-500 text-white 
                               text-xs font-bold rounded-full h-5 w-5 flex 
                               items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

     {pathName == '/' && <div className="hidden md:block border-t dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <span>Categories</span>
                <svg
                  className="w-4 h-4 transition-transform transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="absolute hidden group-hover:block w-[600px] max-h-[400px] overflow-y-auto top-full left-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {categories?.map((cat: string) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`p-3 text-sm rounded-lg transition-all flex items-center
                        ${
                          filters.category === cat
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
                        }`}
                    >
                      {cat}
                      {filters.category === cat && (
                        <svg
                          className="w-4 h-4 ml-2 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                {categories?.length > 15 && (
                  <div className="sticky bottom-0 p-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Scroll to view more categories
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> }

      {isOpen && (
        <div className="md:hidden border-t dark:border-gray-700">
          <div className="px-4 py-3">
            <div className="relative mb-4">
              <input
                type="text"
                value={filters.query}
                onChange={handleSearch}
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 
                         focus:outline-none
                         dark:bg-gray-700 dark:border-gray-600 dark:text-white
                         dark:placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="mb-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    handlePriceChange("min", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handlePriceChange("max", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden pb-4">
                {categories?.map((cat: string) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex items-center justify-between w-full px-4 py-3 
                   text-left rounded-xl mx-2 mb-1 transition-all
                   ${
                     filters.category === cat
                       ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300"
                       : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                   }`}
                  >
                    <span className="text-sm font-medium">{cat}</span>

                    {filters.category === cat && (
                      <svg
                        className="w-5 h-5 text-blue-500 ml-2 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <div className="sticky bottom-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent h-8 pointer-events-none" />

              {filters.category && (
                <div className="px-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Selected category:
                  </div>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {filters.category}
                  </div>
                </div>
              )}
            </div>

            <button
              className="mt-4 w-full flex items-center justify-between px-3 
                             py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                             dark:hover:bg-gray-700 rounded-lg"
            >
              <span>Shopping Cart</span>
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span>{cartCount} items</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
