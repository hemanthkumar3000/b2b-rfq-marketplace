import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createRFQ } from '../api/rfqs';
import RFQForm from '../components/RFQForm';
import ErrorAlert from '../components/ErrorAlert';

export default function CreateRFQ() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    setError('');
    setLoading(true);
    try {
      await createRFQ(payload);
      navigate('/my-rfqs');
    } catch (err) {
      const msg =
        err?.response?.data?.detail || 'Failed to create RFQ.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold">Create RFQ</h1>
      <ErrorAlert message={error} onDismiss={() => setError('')} />
      <div className="rounded border bg-white p-5 shadow">
        <RFQForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}