import api from './client';

export async function createQuotation(rfqId, data) {
  const res = await api.post(`/api/rfqs/${rfqId}/quotations`, data);
  return res.data;
}

export async function getMyQuotations() {
  const res = await api.get('/api/quotations/my');
  return res.data;
}