/**
 * REST API client for Spring Boot backend.
 * Base URL can be set via VITE_API_BASE_URL (e.g. http://localhost:8080/api)
 */

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081/api';

async function request(endpoint, options = {}) {
  const url = `${baseURL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  const response = await fetch(url, config);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP ${response.status}`);
  }
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
