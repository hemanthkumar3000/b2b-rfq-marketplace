export default function QuotationCard({ quotation }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        <div>
          <div className="text-xs font-medium text-gray-500">Quoted Price</div>
          <div className="mt-1 text-base font-semibold text-gray-900">
            ${Number(quotation.price).toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500">Delivery Time</div>
          <div className="mt-1 text-base font-semibold text-gray-900">
            {quotation.delivery_time}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-gray-500">Submitted</div>
          <div className="mt-1 text-sm font-medium text-gray-700">
            {new Date(quotation.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {quotation.message && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
          {quotation.message}
        </div>
      )}
    </div>
  );
}