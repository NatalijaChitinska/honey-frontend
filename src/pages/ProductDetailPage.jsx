import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsApi } from '../api/endpoints.js';
import { useCart } from '../context/CartContext.jsx';
import ProductImage from '../components/product/ProductImage.jsx';
import honeyimg from '../assets/honey-jar.jpeg';

const productExtraData = {
  1: {
    characteristics: [
            "Подлабок и поинтензивен вкус",
            "Потемна боја",
            "Погуста текстура",
            "Побрзо кристализира",
            "Повисока содржина на минерали и аминокиселини",
            "Обезбедува силни антиоксидантни и антибактериски својства",
            "Најдобро за: здравје на респираторниот систем, против инфламација и како помош при варењето на храната"
    ],
    usage: [
          "1 лажичка наутро, за имунитет",
          "Во чај и топли напитоци",
          "Со појадок и во десерти",
          "Во комбинација со јаткасти плодови или овошје",
          "Со сирење или кашкавал (совршен контраст на вкусови)"
    ],
    note: "Совет: Не го додавајте медот во вода потопла од 40°C за да се зачуваат природните својства."
  },

  2: {
    characteristics: [
      "Поблаг и понежен вкус",
      "Миризлив и цветен",
      "Посветла боја",
      "Богат со витамини, ензими",
      "Корисен за имунолошкиот систем, поддршка и олеснување од алергии",
      "Најдобро за: секојдневна консумација, засладување и респираторни заболувања"
    ],
    usage: [
      "1 лажичка наутро, за имунитет",
      "Одличен за растворање во чај, кафе или било кој топол напиток како засладувач",
      "Прелив врз овошје, јогурт и палачинки",
      "Емулгатор во преливи за салати, добро се комбинира со јаболков оцет",
      "Нанесете локално како хидратантен, антиинфламаторен крем за лице"
    ],
    note: "Совет: Ливадскиот мед е совршен за деца и секојдневна употреба.",
    note2: "*Не се препорачува за деца под 12 месеци"
  }
};


function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const extra = productExtraData[id];
  const [openCharacteristics, setOpenCharacteristics] = useState(true);
  const [openUsage, setOpenUsage] = useState(false);

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
        <ProductImage src={honeyimg} alt={product.name} />
        <div className="product-detail__info">
          <h1>{product.name}</h1>
          <p className="product-detail__price">{Number(product.price)} ден.</p>
          {/* {product.description && <p className="product-detail__desc">{product.description}</p>} */}


          {extra && (
  <div className="product-detail__extra">

    {/* Characteristics */}
    <button
      type="button"
      className="collapse-btn"
      onClick={() => setOpenCharacteristics(!openCharacteristics)}
    >
      <span>Карактеристики</span>
      <span className={`arrow ${openCharacteristics ? "arrow--open" : ""}`}>▼</span>
    </button>

    {openCharacteristics && (
      <ul className="collapse-content">
        {extra.characteristics.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    )}

    {/* Usage */}
    <button
      type="button"
      className="collapse-btn"
      onClick={() => setOpenUsage(!openUsage)}
    >
      <span>Како да се користи</span>
      <span className={`arrow ${openUsage ? "arrow--open" : ""}`}>▼</span>
    </button>

    {openUsage && (
      <ul className="collapse-content">
        {extra.usage.map((u, idx) => (
          <li key={idx}>{u}</li>
        ))}
      </ul>
    )}

    <p className="product-detail__note">{extra.note}</p>
    <p className="product-detail__note">{extra.note2}</p>
  </div>
)}



          {/* {extra && (
  <div className="product-detail__extra">
    <h3>Карактеристики</h3>
    <ul>
      {extra.characteristics.map((c, idx) => (
        <li key={idx}>{c}</li>
      ))}
    </ul>

    <h3>Како да се користи</h3>
    <ul>
      {extra.usage.map((u, idx) => (
        <li key={idx}>{u}</li>
      ))}
    </ul>

    <p className="product-detail__note">{extra.note}</p>
  </div>
)} */}

          <button type="button" className="button" onClick={handleAddToCart}>
            Додади во кошничка
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
