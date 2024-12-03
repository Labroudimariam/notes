import axios from 'axios';

axios.defaults.baseURL = 'https://notes.devlop.tech/api';

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('data');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
