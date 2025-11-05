import { auth } from "@/lib/firebase";

// Vite uses import.meta.env for environment variables (available at build time)
// Note: process.env is NOT available in browser in Vite builds
const API_BASE_URL = (import.meta?.env?.VITE_API_URL || "http://localhost:8000");

// Log API URL for debugging
console.log('API_BASE_URL (api.js):', API_BASE_URL);
console.log('VITE_API_URL:', import.meta.env?.VITE_API_URL);

async function authorizedFetch(path, options = {}) {
const user = auth.currentUser;
const token = user ? await user.getIdToken() : null;

const headers = {
"Content-Type": "application/json",
...(options.headers ?? {}),
...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const base = API_BASE_URL.replace(/\/$/, "");
let url = `${base}${path}`;
if (options.params) {
const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(options.params)) {
      searchParams.append(key, value);
    }
    url += `?${searchParams.toString()}`;
  }
  
  // Log URL for debugging
  if (import.meta.env?.DEV) {
    console.log('Fetching from:', url);
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      const message = detail.detail ?? detail.message ?? response.statusText;

      throw new Error(message);
    }

    return response.json();
  } catch (e) {
    // Handle network errors specifically (Failed to fetch, network errors, etc.)
    if (e.name === 'TypeError' && (e.message.includes('fetch') || e.message.includes('Failed to fetch'))) {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      let errorMsg = `Network error: Cannot reach API at ${API_BASE_URL}.`
      
      if (isLocalhost) {
        errorMsg += ` Make sure your backend server is running on ${API_BASE_URL.replace('/api', '')}.`
      } else {
        errorMsg += ` Please check that VITE_API_URL is set correctly in your Vercel environment variables.`
      }
      
      const networkError = new Error(errorMsg);
      console.error('Network error in authorizedFetch:', networkError.message);
      console.error('Original error:', e);
      throw networkError;
    }
    throw e;
  }
}

export const api = {
  get: (path, options = {}) => authorizedFetch(path, { method: "GET", ...options }),
  post: (path, body) =>
    authorizedFetch(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) =>
    authorizedFetch(path, { method: "PATCH", body: JSON.stringify(body) }),
  put: (path, body) =>
    authorizedFetch(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => authorizedFetch(path, { method: "DELETE" }),
};
