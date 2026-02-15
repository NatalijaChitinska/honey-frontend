import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsApi } from '../api/endpoints.js';
import { useCart } from '../context/CartContext.jsx';
import ProductImage from '../components/product/ProductImage.jsx';

function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    productsApi
      .getById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  if (loading) return <div className="page"><p>Loading…</p></div>;
  if (error) return <div className="page"><p className="error">Грешка {error}</p></div>;
  if (!product) return <div className="page"><p>Производот не е пронајден</p><Link to="/api/products">Назад кон производите</Link></div>;

  return (
    <div className="page page--product-detail">
      <Link to="/api/products" className="back-link">← Назад кон производите</Link>
      <div className="product-detail">
        <ProductImage src={product.imageUrl} alt={product.name} />
        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <p className="product-detail__price">{Number(product.price)} ден.</p>
          {product.description && <p className="product-detail__desc">{product.description}</p>}
          <button type="button" className="button" onClick={handleAddToCart}>
            Додади во кошничка
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
