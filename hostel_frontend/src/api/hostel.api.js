import axios from './axios.config';
export const getHostels=async () => await axios.get('/hostels');
export const getHostelById=async (id) => await axios.get(`/hostels/${id}`);