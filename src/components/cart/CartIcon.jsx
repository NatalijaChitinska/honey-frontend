function CartIcon({ count = 0 }) {
  if (count <= 0) return null;
  return <span className="cart-icon" aria-label={`${count} items in cart`}>{count}</span>;
}

export default CartIcon;
