import api from './client';

export async function createRFQ(data) {
  const res = await api.post('/api/rfqs/', data);
  return res.data;
}

export async function getMyRFQs() {
  const res = await api.get('/api/rfqs/my');
  return res.data;
}

export async function listRFQs(params = {}) {
  const res = await api.get('/api/rfqs/', { params });
  return res.data;
}

export async function getRFQ(id) {
  const res = await api.get(`/api/rfqs/${id}`);
  return res.data;
}

export async function getRFQQuotations(id) {
  const res = await api.get(`/api/rfqs/${id}/quotations`);
  return res.data;
}