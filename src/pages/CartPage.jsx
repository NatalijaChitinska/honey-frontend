import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';

function CartPage() {
  const { items } = useCart();

  return (
    <div className="page page--cart">

      {items.length === 0 ? (
        <p>Вашата кошничка е празна. <Link to="/api/products">Разгледајте производи</Link>.</p>
      ) : (
        <>
        <h1>Вашата кошничка</h1>
          <div className="cart-list">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                productId={item.productId}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
          <CartSummary />
          <Link to="/api/order" className="button">Продолжи кон нарачката</Link>
        </>
      )}
    </div>
  );
}

export default CartPage;
