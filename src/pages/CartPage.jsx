import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';

function CartPage() {
  const { items } = useCart();

  return (
    <div className="page page--cart">

      {items.length === 0 ? (
        <div className="cart-empty">
        <div className="cart-empty__card">
          <h2>Вашата кошничка е празна.</h2>
          <p>Додадете мед во кошничката и започнете со нарачка.</p>
    
          <Link to="/api/products" className="button button--primary">
            Разгледај производи
          </Link>
        </div>
        </div>
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
