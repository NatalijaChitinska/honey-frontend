import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import ProductImage from './ProductImage.jsx';

function ProductCard({ product }) {
  const { id, name, price, imageUrl } = product;
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({ productId: id, name, price, imageUrl });
  };

  return (
    <article className="product-card">
      <Link to={`/api/products/${id}`}>
        <ProductImage src={imageUrl} alt={name} />
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">{Number(price)} ден.</p>
      </Link>
      <button type="button" className="product-card__add" onClick={handleAddToCart}>
        Додади во кошничка
      </button>
    </article>
  );
}

export default ProductCard;
