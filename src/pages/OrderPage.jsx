import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ordersApi } from '../api/endpoints.js';
import { useCart } from '../context/CartContext.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';

function OrderPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    ordersApi
      .create({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        items: items.map(({ productId, name: itemName, price, quantity }) => ({
          productId,
          productName: itemName,
          price,
          quantity,
        })),
        total,
      })
      .then(() => {
        clearCart();
        navigate('/api', { state: { orderSuccess: true } });
      })
      .catch((err) => {
        setError(err.message ?? 'Order failed');
        setSubmitting(false);
      });
  };

  if (items.length === 0) {
    return (
      <div className="page page--order">
        <p>Вашата кошничка е празна. <Link to="/api/products">Додадете производи</Link> прво.</p>
      </div>
    );
  }

  return (
    <div className="page page--order">
      <h1>Направете нарачка</h1>
      <CartSummary />
      <p>Достава: {Number(150).toFixed(2)} ден.</p>
      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Име
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Вашето име"
          />
        </label>
        <label>
          Адреса
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Улица и број"
          />
        </label>
        <label>
          Град
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="Град"
          />
        </label>
        <label>
          Телефонски број
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Вашиот телефонски број"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button" disabled={submitting}>
          {submitting ? 'Се испраќа...' : 'Направи нарачка'}
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
