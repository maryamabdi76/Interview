import { render, screen, fireEvent } from '@testing-library/react';
import { useCartStore } from '@/store/CartStore';
import Cart from './Cart';

jest.mock('@/store/CartStore', () => ({
  useCartStore: jest.fn(),
}));

describe('Cart Component', () => {
  const mockIncrease = jest.fn();
  const mockDecrease = jest.fn();
  const mockRemove = jest.fn();

  const mockCartItem = {
    id: '1',
    title: 'Product 1',
    price: 100,
    quantity: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show "Your Cart is empty" when cart is empty', () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cart: [],
    });

    render(<Cart />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('should render cart item and handle actions', () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cart: [mockCartItem],
      getTotal: () => 200,
      decreaseQuantity: mockDecrease,
      increaseQuantity: mockIncrease,
      removeFromCart: mockRemove,
    });

    render(<Cart />);

    // آیتم داخل سبد نمایش داده شود
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // quantity

    // مجموع قیمت نمایش داده شود
    expect(screen.getByText(/total: 200/i)).toBeInTheDocument();

    // کلیک روی +
    fireEvent.click(screen.getByText('+'));
    expect(mockIncrease).toHaveBeenCalledWith('1');

    // کلیک روی -
    fireEvent.click(screen.getByText('-'));
    expect(mockDecrease).toHaveBeenCalledWith('1');

    // کلیک روی Delete
    fireEvent.click(screen.getByText(/delete/i));
    expect(mockRemove).toHaveBeenCalledWith('1');
  });
});
