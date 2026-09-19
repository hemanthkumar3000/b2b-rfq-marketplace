import { useState } from 'react';

export default function QuotationForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    price: '',
    delivery_time: '',
    message: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      price: Number(formData.price),
      delivery_time: formData.delivery_time.trim(),
      message: formData.message.trim(),
    };

    if (payload.price <= 0) {
      setError('Price must be greater than 0.');
      return;
    }
    if (!payload.delivery_time) {
      setError('Delivery time is required.');
      return;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quoted Price
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            required
            min="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estimated Delivery Time
          </label>
          <input
            name="delivery_time"
            value={formData.delivery_time}
            onChange={handleChange}
            placeholder="e.g. 7 days"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message / Notes
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Quotation'}
        </button>
      </div>
    </form>
  );
}