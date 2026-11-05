import { Link } from 'react-router-dom';
import honeyVideo from '../assets/honey.mp4';

function HomePage() {
  return (
    <div className="page page--home">
      <section className="hero">
        <video className="hero__bg" autoPlay muted loop playsInline>
          <source src={honeyVideo} type="video/mp4" />
        </video>
        <div className="hero__content">
          <h1>Малешевски Мед</h1>
          <p>Природен и чист</p>
          <Link to="/api/products" className="button">Заслади се</Link>
        </div>
      </section>

      <section className="intro">
        <h2>Зошто ОрМед?</h2>
        <p>
          Нашиот мед доаѓа директно од малешевските планини и ливади, со традиционален пристап и љубов кон пчелите.
          Секој тегличка е дар од природата.
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

      <section className="how-it-works">
        <h2>Како да нарачате</h2>
        <div className="how-it-works__steps">
          <article className="step-card">
            <span className="step-card__number">1</span>
            <h3>Изберете мед</h3>
            <p>Разгледајте ја понудата и додадете го омилениот мед во кошничката.</p>
          </article>
          <article className="step-card">
            <span className="step-card__number">2</span>
            <h3>Внесете податоци</h3>
            <p>Пополнете име, телефон и адреса за достава — ние се грижиме за останатото.</p>
          </article>
          <article className="step-card">
            <span className="step-card__number">3</span>
            <h3>Примете ја пратката</h3>
            <p>Медот пристигнува до вашиот дом. Бесплатна достава за повеќе од 4 производи.</p>
          </article>
        </div>
      </section>

      <section className="shop-cta">
        <div className="shop-cta__content">
          <h2>Пробај го вкусот на природата</h2>
          <p>
            Избери од нашата понуда: интензивен планински или ароматичен ливадски.
            Или одбери ги двата — комплетно медено уживање!
          </p>
          <Link to="/api/products" className="button button--shop">
            Посети ја продавницата
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
