'use client';

import React from 'react';
import { useCartStore } from '@/store/CartStore';

type Props = {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
};

const ProductCard = (product: Props) => {
  const { title, price, inStock } = product;
  const { addToCart } = useCartStore();
  return (
    <div className="flex flex-col gap-4 p-4 m-4 rounded bg-zinc-100 shadow-md hover:shadow-xl">
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-700">{price}</p>
      <button
        disabled={!inStock}
        onClick={() => addToCart(product)}
        className="w-40 p-2 rounded bg-blue-400 text-white cursor-pointer hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        {!inStock ? 'Not Exist' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default React.memo(ProductCard);
