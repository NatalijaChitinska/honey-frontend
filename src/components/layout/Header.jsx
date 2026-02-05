import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import CartIcon from '../cart/CartIcon.jsx';
import logo from '../../assets/logoFull.png'

function Header() {
  const { itemCount } = useCart();

  return (
    <header className="layout-header">
      <Link to="/api" className="layout-header__logo">
       <img class='header__logo'
          src={logo}
          alt="Honey background"
        />
      </Link>
      <nav className="layout-header__nav">
        <Link to="/api">Почетна</Link>
        <Link to="/api/products">Производи</Link>
        <Link to="/api/cart" className="layout-header__cart-link">
          Кошничка
          <CartIcon count={itemCount} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
