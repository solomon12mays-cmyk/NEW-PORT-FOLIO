import api from './api';

export const sendMessage = (data) => api.post('/contact', data);