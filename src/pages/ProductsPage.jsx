import { useEffect, useState } from 'react';
import { productsApi } from '../api/endpoints.js';
import ProductGrid from '../components/product/ProductGrid.jsx';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productsApi
      .getAll()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page page--products">
      <h1>Сите производи</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="error">Could not load products: {error}</p>}
      {!loading && !error && <ProductGrid products={products} />}
    </div>
  );
}

export default ProductsPage;
