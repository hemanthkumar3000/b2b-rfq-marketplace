import { Link } from 'react-router-dom';

export default function RFQCard({ rfq }) {
  const deadline = new Date(rfq.deadline);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow">
      <div>
        <h3 className="text-base font-semibold text-gray-900">
          {rfq.product_name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-700">
          {rfq.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium text-gray-700">Quantity:</span> {rfq.quantity}
          </div>
          <div>
            <span className="font-medium text-gray-700">Location:</span>{' '}
            {rfq.delivery_location}
          </div>
          <div className="col-span-2">
            <span className="font-medium text-gray-700">Deadline:</span>{' '}
            {deadline.toLocaleString()}
          </div>
          <div className="col-span-2">
            <span className="font-medium text-gray-700">Status:</span>{' '}
            <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide">
              {rfq.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <Link
          to={`/rfqs/${rfq.id}`}
          className="inline-block w-full rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}