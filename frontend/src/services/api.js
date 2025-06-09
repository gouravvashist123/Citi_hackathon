import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Users API calls
export const usersAPI = {
  getFeed: () => api.get('/users/feed'),
  updatePreferences: (preferences) => api.put('/users/preferences', { sriPreferences: preferences }),
};

// Investors API calls
export const investorsAPI = {
  getAll: () => api.get('/investors'),
  follow: (investorId) => api.post(`/investors/${investorId}/follow`),
};

// Suggestions API calls
export const suggestionsAPI = {
  getAISuggestions: (preferences) => {
    const params = preferences ? { preferences: preferences.join(',') } : {};
    return api.get('/suggestions', { params });
  },
};

export default api;
