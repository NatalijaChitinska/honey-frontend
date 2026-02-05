import { useCart } from '../../context/CartContext.jsx';

function CartItem({ productId, name, price, quantity, imageUrl }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      {imageUrl && <img src={imageUrl} alt={name} className="cart-item__img" />}
      <div className="cart-item__info">
        <span className="cart-item__name">{name}</span>
        <span className="cart-item__price">€{Number(price).toFixed(2)}</span>
      </div>
      <div className="cart-item__qty">
        <button type="button" onClick={() => updateQuantity(productId, quantity - 1)} aria-label="Decrease">−</button>
        <span>{quantity}</span>
        <button type="button" onClick={() => updateQuantity(productId, quantity + 1)} aria-label="Increase">+</button>
      </div>
      <button type="button" className="cart-item__remove" onClick={() => removeItem(productId)} aria-label="Remove">
        Избриши
      </button>
    </div>
  );
}

export default CartItem;
