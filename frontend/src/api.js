import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

export const fetchStates = () => API.get('/states').then(res => res.data);
export const fetchCities = (stateId) => API.get('/cities', { params: stateId ? { state: stateId } : {} }).then(res => res.data);
export const fetchPGs = (params) => API.get('/pgs', { params }).then(res => res.data);
export const fetchPGById = (id) => API.get(`/pgs/${id}`).then(res => res.data);
export const contactOwner = (payload) => API.post('/pgs/contact', payload).then(res => res.data);
