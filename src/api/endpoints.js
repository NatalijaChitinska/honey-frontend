import { api } from './client.js';

const PRODUCTS = '/products';
const ORDERS = '/orders';

/**
 * Extract product list from backend response (array, or wrapped in content/data/_embedded).
 */
function toProductList(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response.map(normalizeProduct);
  const list =
    response.content ??
    response.data ??
    response.products ??
    response._embedded?.products ??
    [];
  return (Array.isArray(list) ? list : []).map(normalizeProduct).filter(Boolean);
}

/**
 * Map backend fields to frontend shape (id, name, price, imageUrl).
 */
function normalizeProduct(p) {
  if (!p || (p.id == null && p.productId == null)) return null;
  return {
    id: p.id ?? p.productId,
    name: p.name ?? p.productName ?? p.title ?? '',
    price: p.price ?? 0,
    imageUrl: p.imageUrl ?? p.image_url ?? p.image ?? null,
    description: p.description ?? null,
  };
}

function toSingleProduct(response) {
  if (!response) return null;
  const raw = response.data ?? response.content ?? response;
  return normalizeProduct(raw);
}

export const productsApi = {
  getAll: () => api.get(PRODUCTS).then(toProductList),
  getById: (id) => api.get(`${PRODUCTS}/${id}`).then(toSingleProduct),
  getFeatured: () => api.get(`${PRODUCTS}?featured=true`).then(toProductList),
};

export const ordersApi = {
  create: (order) => api.post(ORDERS, order),
};
