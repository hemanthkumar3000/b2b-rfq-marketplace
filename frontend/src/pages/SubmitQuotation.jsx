import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createQuotation } from '../api/quotations';
import QuotationForm from '../components/QuotationForm';
import ErrorAlert from '../components/ErrorAlert';

export default function SubmitQuotation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (payload) => {
    setError('');
    setLoading(true);
    try {
      await createQuotation(id, payload);
      navigate('/my-quotations');
    } catch (err) {
      const msg =
        err?.response?.data?.detail || 'Failed to submit quotation.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold">Submit Quotation</h1>
      <ErrorAlert message={error} onDismiss={() => setError('')} />
      <div className="rounded border bg-white p-5 shadow">
        <QuotationForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}