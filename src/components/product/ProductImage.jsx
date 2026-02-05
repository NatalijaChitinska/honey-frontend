function ProductImage({ src, alt }) {
  return (
    <div className="product-image">
      {src ? (
        <img src={src} alt={alt ?? 'Product'} />
      ) : (
        <div className="product-image__placeholder" aria-hidden>No image</div>
      )}
    </div>
  );
}

export default ProductImage;
