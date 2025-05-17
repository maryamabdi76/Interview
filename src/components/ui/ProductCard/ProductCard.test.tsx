import { render, screen } from '@testing-library/react';

import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('renders product info', () => {
    render(
      <ProductCard id={'100'} title="Test Product" price={99} inStock={true} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('shows Not Exist when out of stock', () => {
    render(
      <ProductCard id={'100'} title="Test Product" price={99} inStock={false} />
    );

    expect(screen.getByText('Not Exist')).toBeInTheDocument();
  });
});
