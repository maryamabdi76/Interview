import { render, screen, fireEvent } from '@testing-library/react';
import { useCartStore } from '@/store/CartStore';
import ProductCard from './ProductCard';

// Mock Store
jest.mock('@/store/CartStore', () => ({
  useCartStore: jest.fn(),
}));

describe('ProductCard Component', () => {
  const mockAddToCart = jest.fn();

  const defaultProps = {
    id: '1',
    title: 'Test Product',
    price: 100,
    inStock: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  it('should render product title and price', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should call addToCart when "Add to Cart" is clicked', () => {
    render(<ProductCard {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalledWith(defaultProps);
  });

  it('should disable button and show "Not Exist" when out of stock', () => {
    render(<ProductCard {...defaultProps} inStock={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Not Exist');
  });
});
