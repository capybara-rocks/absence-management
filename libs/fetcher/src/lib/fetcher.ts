import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAuthHeader = (accessToken: string) => {
  instance.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
};

export const clearAuthHeader = () => {
  delete instance.defaults.headers['Authorization'];
};

export default instance;
