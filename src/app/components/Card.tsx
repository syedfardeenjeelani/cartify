import React from "react";
import { Star } from "lucide-react";

interface CardProps {
  product: any;
  onAddToCart: (productId: number) => void;
}

const Card = ({ product, onAddToCart }: CardProps) => {
  const renderRating = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(product.rating)
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-gray-300 dark:stroke-gray-600"
        }`}
      />
    ));
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
          }}
        />

        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.stock > 0
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {product.title}
          </h3>
          <div className="flex items-center space-x-1">
            {renderRating()}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              ({product.rating})
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="block text-sm text-red-600 dark:text-red-400 line-through">
                $
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock <= 0}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              product.stock > 0
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div> 
    </div>
  );
};

export default Card;
