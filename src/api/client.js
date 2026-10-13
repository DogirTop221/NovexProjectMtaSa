import axios from 'axios';

const gameApi = axios.create({
  baseURL: import.meta.env.VITE_GAME_API_URL || '/api/game',
  timeout: 5000,
});

const siteApi = axios.create({
  baseURL: import.meta.env.VITE_SITE_API_URL || '/api/site',
  timeout: 10000,
});

siteApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export {gameApi, siteApi};
