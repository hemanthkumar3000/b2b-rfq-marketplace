import { useState } from 'react';

export default function RFQForm({ initialData = {}, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    product_name: initialData.product_name || '',
    description: initialData.description || '',
    quantity: initialData.quantity || '',
    delivery_location: initialData.delivery_location || '',
    deadline: initialData.deadline
      ? new Date(initialData.deadline).toISOString().slice(0, 16)
      : '',
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
      product_name: formData.product_name.trim(),
      description: formData.description.trim(),
      quantity: Number(formData.quantity),
      delivery_location: formData.delivery_location.trim(),
      deadline: new Date(formData.deadline).toISOString(),
    };

    if (!payload.product_name || !payload.description || !payload.delivery_location) {
      setError('Please fill all required fields.');
      return;
    }
    if (payload.quantity <= 0) {
      setError('Quantity must be greater than 0.');
      return;
    }
    if (new Date(payload.deadline) <= new Date()) {
      setError('Deadline must be in the future.');
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product / Service Name
        </label>
        <input
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirement Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            required
            min="1"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Delivery Location
          </label>
          <input
            name="delivery_location"
            value={formData.delivery_location}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deadline
        </label>
        <input
          name="deadline"
          type="datetime-local"
          value={formData.deadline}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData.id ? 'Update RFQ' : 'Create RFQ'}
        </button>
      </div>
    </form>
  );
}