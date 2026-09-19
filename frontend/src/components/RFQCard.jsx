import { Link } from 'react-router-dom';

export default function RFQCard({ rfq, showBuyerActions = false }) {
  const deadline = new Date(rfq.deadline);

  return (
    <div className="rounded border bg-white p-4 shadow-sm hover:shadow">
      <h3 className="text-lg font-semibold">{rfq.product_name}</h3>
      <p className="mt-1 text-sm text-gray-700 line-clamp-2">
        {rfq.description}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>Quantity: {rfq.quantity}</div>
        <div>Location: {rfq.delivery_location}</div>
        <div>Deadline: {deadline.toLocaleString()}</div>
        <div>Status: {rfq.status}</div>
      </div>
      <div className="mt-4">
        <Link
          to={`/rfqs/${rfq.id}`}
          className="inline-block rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}