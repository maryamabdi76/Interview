'use client';

import { useCartStore } from '@/store/CartStore';

const Cart = () => {
  const { cart, getTotal, decreaseQuantity, increaseQuantity, removeFromCart } =
    useCartStore();

  if (cart.length === 0) {
    return <p className="p-4 text-gray-500">Your Cart is empty</p>;
  }

  return (
    <div className="p-4 border rounded-md bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">🛒 Cart</h2>
      <ul className="space-y-3">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-600">${item.price}</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-200 text-gray-700 px-2 rounded"
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-200 text-gray-700 px-2 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-200 text-red-700 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-right font-bold text-lg">
        Total: {getTotal()}
      </div>
    </div>
  );
};

export default Cart;
