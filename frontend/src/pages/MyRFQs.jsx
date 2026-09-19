import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyRFQs } from '../api/rfqs';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorAlert from '../components/ErrorAlert';
import RFQCard from '../components/RFQCard';

export default function MyRFQs() {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyRFQs();
        setRfqs(data);
      } catch (err) {
        setError('Failed to load RFQs.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">My RFQs</h1>
          <p className="text-sm text-gray-600">
            Manage your requests for quotation
          </p>
        </div>
        <Link
          to="/rfqs/create"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Create New RFQ
        </Link>
      </div>

      {rfqs.length === 0 ? (
        <EmptyState message="You have not created any RFQs yet." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rfqs.map((rfq) => (
            <RFQCard key={rfq.id} rfq={rfq} />
          ))}
        </div>
      )}
    </div>
  );
}