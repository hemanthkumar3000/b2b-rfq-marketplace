import { useEffect, useState } from 'react';
import { listRFQs } from '../api/rfqs';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import EmptyState from '../components/EmptyState';
import RFQCard from '../components/RFQCard';

export default function BrowseRFQs() {
  const [rfqs, setRfqs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRFQs = async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const params = { status: 'open' };
      if (query.trim()) params.search = query.trim();
      const data = await listRFQs(params);
      setRfqs(data);
    } catch (err) {
      setError('Failed to load RFQs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRFQs(search);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Browse RFQs</h1>
        <p className="text-sm text-gray-600">
          Find open requests from buyers
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorAlert message={error} />
      ) : rfqs.length === 0 ? (
        <EmptyState message="No open RFQs found." />
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