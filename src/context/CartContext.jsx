import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.productId === action.payload.productId);
      if (existing) {
        return state.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
            : i
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity ?? 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.productId !== action.payload.productId);
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) return state.filter((i) => i.productId !== productId);
      return state.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      );
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => dispatch({ type: 'ADD', payload: item });
  const removeItem = (productId) => dispatch({ type: 'REMOVE', payload: { productId } });
  const updateQuantity = (productId, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);

  const value = {
    items,
    itemCount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
