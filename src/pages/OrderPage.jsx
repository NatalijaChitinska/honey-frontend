import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ordersApi } from '../api/endpoints.js';
import { useCart } from '../context/CartContext.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import { validateOrderForm } from '../utils/validateOrder.js';

const MACEDONIAN_CITIES = [
  'Берово', 'Битола', 'Богданци', 'Валандово', 'Велес', 'Виница',
  'Гевгелија', 'Гостивар', 'Дебар', 'Делчево', 'Демир Капија', 'Демир Хисар',
  'Кавадарци', 'Кичево', 'Кочани', 'Кратово', 'Крива Паланка', 'Крушево',
  'Куманово', 'Македонски Брод', 'Македонска Каменица', 'Неготино', 'Охрид',
  'Пехчево', 'Прилеп', 'Пробиштип', 'Радовиш', 'Ресен', 'Свети Николе',
  'Скопје', 'Струга', 'Струмица', 'Тетово', 'Штип',
].sort((a, b) => a.localeCompare(b, 'mk'));

function OrderPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const values = { name, email, shippingAddress, city, phone, notes };

  const validateField = (field, nextValues = values) => {
    const all = validateOrderForm(nextValues, MACEDONIAN_CITIES);
    setFieldErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const errors = validateOrderForm(values, MACEDONIAN_CITIES);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

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
        let errorString = typeof err === 'string' ? err : err.message || '';
        if (errorString.startsWith('Error: ')) {
          errorString = errorString.replace('Error: ', '');
        }
        try {
          const parsed = JSON.parse(errorString);
          setError(parsed.message || 'Настана грешка при нарачката.');
        } catch {
          setError(errorString || 'Настана грешка при нарачката.');
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

      <form className="order-form" onSubmit={handleSubmit} noValidate>
        <div className="form-content">
          <div className="form-main">
            <label>
              Име *
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) validateField('name', { ...values, name: e.target.value });
                }}
                onBlur={() => validateField('name')}
                aria-invalid={Boolean(fieldErrors.name)}
                placeholder="Вашето име"
              />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </label>
            <label>
              Е-пошта *
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) validateField('email', { ...values, email: e.target.value });
                }}
                onBlur={() => validateField('email')}
                aria-invalid={Boolean(fieldErrors.email)}
                placeholder="пр. ime.prezime@gmail.com"
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </label>
            <label>
              Адреса *
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => {
                  setShippingAddress(e.target.value);
                  if (fieldErrors.shippingAddress) {
                    validateField('shippingAddress', { ...values, shippingAddress: e.target.value });
                  }
                }}
                onBlur={() => validateField('shippingAddress')}
                aria-invalid={Boolean(fieldErrors.shippingAddress)}
                placeholder="Улица и број"
              />
              {fieldErrors.shippingAddress && (
                <span className="field-error">{fieldErrors.shippingAddress}</span>
              )}
            </label>
            <label>
              Град *
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  validateField('city', { ...values, city: e.target.value });
                }}
                onBlur={() => validateField('city')}
                aria-invalid={Boolean(fieldErrors.city)}
              >
                <option value="">-- Изберете град --</option>
                {MACEDONIAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {fieldErrors.city && <span className="field-error">{fieldErrors.city}</span>}
            </label>
            <label>
              Телефонски број *
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) validateField('phone', { ...values, phone: e.target.value });
                }}
                onBlur={() => validateField('phone')}
                aria-invalid={Boolean(fieldErrors.phone)}
                placeholder="070123456"
              />
              {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
            </label>
          </div>

          <div className="form-side">
            <label>
              Забелешки
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  if (fieldErrors.notes) validateField('notes', { ...values, notes: e.target.value });
                }}
                onBlur={() => validateField('notes')}
                aria-invalid={Boolean(fieldErrors.notes)}
                placeholder="Додадете ги вашите забелешки овде..."
                rows="10"
                maxLength={500}
              />
              {fieldErrors.notes && <span className="field-error">{fieldErrors.notes}</span>}
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
