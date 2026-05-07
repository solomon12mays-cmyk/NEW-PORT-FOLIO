import api from './api';

export const getProjects = (filters = {}) => api.get('/projects', { params: filters });

export const getProject = (slug) => api.get(`/projects/${slug}`);

export const getFeaturedProjects = () => api.get('/featured-projects');