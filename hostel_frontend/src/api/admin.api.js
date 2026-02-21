import axios from './axios.config';

const ADMIN_API='/admin';

export const adminLogin=async (credentials) =>
{
  const response=await axios.post(`${ADMIN_API}/login`, credentials);
  return response.data;
};

export const getAdminHostels=async (token) =>
{
  const response=await axios.get(`${ADMIN_API}/hostels`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
};

export const createHostel=async (token, data) =>
{
  const response=await axios.post(`${ADMIN_API}/hostels`, data, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
};

export const updateHostel=async (token, id, data) =>
{
  const response=await axios.put(`${ADMIN_API}/hostels/${id}`, data, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
};

export const deleteHostel=async (token, id) =>
{
  const response=await axios.delete(`${ADMIN_API}/hostels/${id}`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
};

export const getContacts=async (token) =>
{
  const response=await axios.get(`${ADMIN_API}/contacts`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
};

export const deleteContact=async (token, id) =>
{
  const response=await axios.delete(`${ADMIN_API}/contacts/${id}`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
};

/* ── Upload a single image to Cloudinary via backend ── */
export const uploadImage=async (token, file) =>
{
  const formData=new FormData();
  formData.append('image', file);
  const response=await axios.post(`${ADMIN_API}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data; // { url, public_id }
};
