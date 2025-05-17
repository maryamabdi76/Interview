import Cart from '@/components/ui/Cart/Cart';
import ProductCard from '@/components/ui/ProductCard/ProductCard';

const products = [
  { id: '1', title: 'laptop', price: 100000000, inStock: true },
  { id: '2', title: 'mobile', price: 200000000, inStock: true },
  { id: '3', title: 'tablet', price: 300000000, inStock: true },
];

export const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
};
