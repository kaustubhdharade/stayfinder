const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Common fetch helper for StayFinder API requests
 * @param {string} endpoint - Relative API endpoint (e.g. '/health')
 * @param {RequestInit} [options] - Standard fetch options
 * @returns {Promise<any>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Health check query
 */
export async function checkServerHealth() {
  return apiRequest('/health');
}
