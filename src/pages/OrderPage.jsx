import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ordersApi } from '../api/endpoints.js';
import { useCart } from '../context/CartContext.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';

function OrderPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState('');

  const macedonianCities = [
    "Берово", "Битола", "Богданци", "Валандово", "Велес", "Виница", 
    "Гевгелија", "Гостивар", "Дебар", "Делчево", "Демир Капија", "Демир Хисар", 
    "Кавадарци", "Кичево", "Кочани", "Кратово", "Крива Паланка", "Крушево", 
    "Куманово", "Македонски Брод", "Македонска Каменица", "Неготино", "Охрид", 
    "Пехчево", "Прилеп", "Пробиштип", "Радовиш", "Ресен", "Свети Николе", 
    "Скопје", "Струга", "Струмица", "Тетово", "Штип"
  ].sort((a, b) => a.localeCompare(b, 'mk')); 
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    ordersApi
      .create({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        shippingAddress: shippingAddress.trim(),
        city: city.trim(),
        notes: notes.trim(),
      
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
        navigate('/api/thankyou', { state: { orderSuccess: true } });
      })
      .catch((err) => {
        let errorString = typeof err === 'string' ? err : err.message || "";
        // 2. Remove the "Error: " prefix if it exists so we can parse the JSON
        if (errorString.startsWith("Error: ")) {
            errorString = errorString.replace("Error: ", "");
        }
        try {
          const parsed = JSON.parse(errorString);
          setError(parsed.message || "Настана грешка при нарачката.");
        } catch (e) {
          setError(errorString || "Настана грешка при нарачката.");
        }
        setSubmitting(false);
      });
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
      <div className="cart-empty__card">
        <h2>Вашата кошничка е празна.</h2>
        <p>Додадете мед во кошничката и започнете со нарачка.</p>
  
        <Link to="/api/products" className="button button--primary">
          Разгледај производи
        </Link>
      </div>
      </div>
    );
  }

  return (
    <div className="page page--order">
      <h1>Направете нарачка</h1>
      <CartSummary />
      
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-content">
          {/* Left Side: Standard Fields */}
          <div className="form-main">
            <label>
              Име *
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Вашето име"
              />
            </label>
            <label>
              Е-пошта *
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="пр. ime.prezime@gmail.com"
              />
            </label>
            <label>
              Адреса *
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                placeholder="Улица и број"
              />
            </label>
            <label>
              Град *
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">-- Изберете град --</option>
                {macedonianCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Телефонски број *
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="070123456"
              />
            </label>
          </div>
  
          {/* Right Side: Notes Field */}
          <div className="form-side">
            <label>
              Забелешки
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Додадете ги вашите забелешки овде..."
                rows="10"
              />
            </label>
          </div>
        </div>

        <p className="required-legend">
          <span className="required-star">*</span> Полињата се задолжителни
        </p>
  
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button" disabled={submitting}>
          {submitting ? 'Се испраќа...' : 'Направи нарачка'}
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
