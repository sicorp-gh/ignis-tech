import axios from 'axios';

// Enable sending cookies with cross-origin requests
axios.defaults.withCredentials = true;

// Add a request interceptor to include the JWT token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('ignis_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost/ignis-tech';
  }
  return window.location.origin;
};

export const BASE_URL = getBaseUrl();
export const API_BASE = `${BASE_URL}/api`;

export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Ensure we don't double up on slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${BASE_URL}/${cleanPath}`;
};

export const fetchAllContent = async () => {
  try {
    const response = await axios.get(`${API_BASE}/content`);
    if (response.data.settings) {
        applyDynamicStyles(response.data.settings);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
};

const applyDynamicStyles = (settings: any) => {
    if (settings.primary_color) {
        document.documentElement.style.setProperty('--color-primary', settings.primary_color);
    }
    if (settings.secondary_color) {
        document.documentElement.style.setProperty('--color-secondary', settings.secondary_color);
    }
};

export const subscribeNewsletter = async (email: string) => {
    try {
        const response = await axios.post(`${API_BASE}/newsletter/subscribe`, { email });
        return response.data;
    } catch (error) {
        console.error('Newsletter error:', error);
        return { status: 'error', message: 'Failed to subscribe' };
    }
};

export default axios;
