"use client";
import { useGetProductsQuery } from "@/app/services/productApi";
import { use } from "react";
import Image from "next/image";
import {
  Star,
  Truck,
  ShieldCheck,
  Undo2,
  Tag,
  Scale,
  WalletCards,
} from "lucide-react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data: products, isLoading, error } = useGetProductsQuery();
//   console.log(products?.products);
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 dark:bg-gray-900">
        <div className="text-center max-w-md p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Oops!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're having trouble loading this product. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const product = products?.products?.find(
    (p: any) => p.id == resolvedParams.id
  );
  // console.log(product)
  return (
    product && (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-default">
                  {product.category}
                </span>
              </li>
              <li>/</li>
              <li className="font-medium text-gray-900 dark:text-white cursor-default">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <Image
                  src={product.thumbnail || "/placeholder.jpg"}
                  alt={product.title}
                  width={800}
                  height={800}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-b pb-6 dark:border-gray-700">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1 text-gray-600 dark:text-gray-300">
                      {product.rating} · {product.reviews.length} reviews
                    </span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                    <Truck className="w-5 h-5 mr-1" />
                    Free shipping
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl line-through text-gray-400 dark:text-gray-500">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                  <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                    Save {product.discountPercentage}%
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Undo2 className="w-5 h-5 mr-1" />
                    30-day returns
                  </span>
                  <span className="flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-1" />
                    2-year warranty
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center">
                  <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Best Price
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Guaranteed
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center">
                  <Scale className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Authentic
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      100% Verified
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold dark:text-white">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    ["Brand", product.brand],
                    ["Category", product.category],
                    ["Weight", `${product.weight}g`],
                    [
                      "Dimensions",
                      `${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth}cm`,
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-2 border-b dark:border-gray-700"
                    >
                      <span className="text-gray-600 dark:text-gray-300">
                        {label}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-6 border-t dark:border-gray-700">
                <div className="flex space-x-4">
                  <div className="flex items-center border dark:border-gray-700 rounded-lg px-4">
                    <button className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      -
                    </button>
                    <input
                      type="number"
                      defaultValue="1"
                      className="w-16 text-center bg-transparent dark:text-white"
                    />
                    <button className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      +
                    </button>
                  </div>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
                    <WalletCards className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Product Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8 border-b dark:border-gray-700">
                <nav className="flex space-x-8">
                  <button className="py-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    Reviews ({product.reviews.length})
                  </button>
                </nav>
              </div>

              <div className="mt-8 space-y-6">
                {product.reviews.map((review: any, id: any) => (
                  <div
                    key={id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm dark:shadow-none dark:border dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 dark:text-gray-300">
                            {review.reviewerName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">
                            {review.reviewerName}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="ml-1">{review.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                  Shipping Info
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>🚚 Free standard shipping</p>
                  <p>⏱️ Delivery in 3-5 business days</p>
                  <p>📦 Ships from our US warehouse</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                  Return Policy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {product.returnPolicy || "30-day easy returns"}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                  QR Code
                </h3>
                <div className="flex justify-center">
                  <Image
                    src={product.meta.qrCode}
                    alt="QR Code"
                    width={150}
                    height={150}
                    className="rounded-lg border p-2 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
