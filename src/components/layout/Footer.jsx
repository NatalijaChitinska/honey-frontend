import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="layout-footer">
      <div className="layout-footer__inner">
        <div className="layout-footer__col">
          <h3>ОрМед</h3>
          <p>Природен мед од Малешевијата. Семеен пристап, чиста природа и грижа за пчелите.</p>
        </div>
        <div className="layout-footer__col">
          <h3>Информации</h3>
          <nav className="layout-footer__links">
            <Link to="/api/about">За нас</Link>
            <Link to="/api/privacy">Политика за приватност</Link>
            <Link to="/api/refund">Враќање и рекламации</Link>
          </nav>
        </div>
        <div className="layout-footer__col">
          <h3>Продавница</h3>
          <nav className="layout-footer__links">
            <Link to="/api/products">Производи</Link>
            <Link to="/api/cart">Кошничка</Link>
            <Link to="/api/order">Нарачка</Link>
          </nav>
        </div>
      </div>
      <p className="layout-footer__copy">© ОрМед, {year}</p>
    </footer>
  );
}

export default Footer;
