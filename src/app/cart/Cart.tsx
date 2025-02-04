"use client";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const { total, discountedTotal, totalQuantity } = useSelector(
    (state: any) => state.cart
  );

  const handleUpdateQuantity = (productId: number, increment: boolean) => {
    const product = cartItems.find((item: any) => item.id === productId);
    // console.log(product)
    if (!product) return;

    const newQuantity = Math.max(1, product.quantity + (increment ? 1 : -1));
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: number) => {
    // console.log(productId,'//////')
    dispatch(removeItem(productId));
  };

  return (
    <div className="dark:bg-gray-400 pt-10 h-[100vh]">
      <div className="w-full max-w-4xl  mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Shopping Cart
        </h2>

        <div className="space-y-6">
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
                onError={(e: any) => {
                  e.target.src = "/api/placeholder/96/96";
                }}
              />

              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>

                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, false)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, true)}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  $
                  {(
                    item.price *
                    (1 - (item.discountPercentage || 0) / 100) *
                    item.quantity
                  ).toFixed(2)}
                </div>
                {item.discountPercentage > 0 && (
                  <div className="text-sm text-red-500 line-through">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex justify-between text-lg mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Subtotal
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-lg mb-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Discount
            </span>
            <span className="font-bold text-green-600 dark:text-green-400">
              -${(total - discountedTotal).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="font-semibold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${discountedTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
          Proceed to Checkout ({totalQuantity} items)
        </button>
      </div>
    </div>
  );
};

export default Cart;
