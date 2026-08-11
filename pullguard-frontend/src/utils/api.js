import axios from 'axios';
import { API_URL } from './config';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const demoApi = {
  getReviews: () => api.get('/api/demo/reviews').then((r) => r.data.reviews),
  getReview: (id) => api.get(`/api/demo/reviews/${id}`).then((r) => r.data.review),
  getRepos: () => api.get('/api/demo/repos').then((r) => r.data.repos),
  getMetrics: () => api.get('/api/demo/metrics').then((r) => r.data.metrics)
};

export const liveApi = {
  getReviews: (repo) => api.get('/api/reviews', { params: repo ? { repo } : {} }).then((r) => r.data.reviews),
  getReview: (id) => api.get(`/api/reviews/${id}`).then((r) => r.data.review),
  getRepos: () => api.get('/api/repos').then((r) => r.data.repos),
  getMetrics: () => api.get('/api/metrics').then((r) => r.data.metrics),
  getConfig: () => api.get('/api/config').then((r) => r.data.config)
};

export default api;
