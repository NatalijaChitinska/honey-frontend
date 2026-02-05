import { useCart } from '../../context/CartContext.jsx';

function CartSummary() {
  const { total, itemCount } = useCart();

  return (
    <div className="cart-summary">
      <p>Производи: {itemCount}</p>
      <p className="cart-summary__total">Меѓузбир: {Number(total).toFixed(2)} ден.</p>
      {itemCount < 4 ? <p className="cart-summary__total">Достава: {Number(150).toFixed(2)} ден.</p>  :
       <p className="cart-summary__total">Достава: 0 ден.</p>
      }
      <p className="cart-summary__total">Вкупно: {Number(total + (itemCount < 4 ? 150 : 0)).toFixed(2)} ден.</p>
    </div>
  );
}

export default CartSummary;
