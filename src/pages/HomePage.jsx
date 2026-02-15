import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/endpoints.js';
import ProductGrid from '../components/product/ProductGrid.jsx';
import honeyVideo from '../assets/honey.mp4';

function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productsApi
      .getFeatured()
      .then((list) => setFeatured(Array.isArray(list) ? list : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page--home">
      <section className="hero">
        <video className="hero__bg" autoPlay muted loop playsInline>
          <source src={honeyVideo} type="video/mp4" />
        </video>
        <div className='hero__content'>
          <h1>Малешевски Мед</h1>
          <p>Природен и Чист </p>
          <Link to="/api/products" className="button">Заслади се</Link>
        </div>
      </section>


      {/* SHORT INTRO SECTION */}
      <section className="intro">
        <h2>Зошто ОрМед?</h2>
        <p>
          Нашиот мед доаѓа директно од малешевские планини и ливади, со традиционален пристап и љубов кон пчелите.
          Секој тегличка е природен дар од планината.
        </p>

        <div className="intro__highlights">
          <div className="highlight-card">
            <h3>🌿 100% природен</h3>
            <p>Без додадени шеќери, без адитиви, без компромис.</p>
          </div>

          <div className="highlight-card">
            <h3>🐝 100% домашен</h3>
            <p>Традиционален процес, со љубов и грижа кон пчелите и природата.</p>
          </div>

          <div className="highlight-card">
            <h3>🏔️ Малешевија</h3>
            <p>Мед од чиста планинска средина со богата флора.</p>
          </div>
        </div>
      </section>

      {/* SHOP CTA SECTION */}
      <section className="shop-cta">
        <div className="shop-cta__content">
          <h2>Пробај го вкусот на природата</h2>
          <p>
            Избери од нашата понуда: интензивен планински или ароматичен ливадски.<br>
            </br> ... или одбери ги двата - комплетно медено уживање!
          </p>
          <Link to="/api/products" className="button button--shop">
            Посети ја продавницата
          </Link>
        </div>
      </section>

      <section className="featured">
        <h2>Нашата понуда</h2>
        {loading && <p>Loading…</p>}
        {error && <p className="error">Не може да се вчитаат производите: {error}</p>}
        {!loading && !error && (
          featured.length > 0 ? (
            <ProductGrid products={featured} />
          ) : (
            <p>No featured products. <Link to="/api/products">Видете ги сите производи</Link>.</p>
          )
        )}
      </section>
    </div>
  );
}

export default HomePage;
