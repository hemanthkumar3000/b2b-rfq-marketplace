export default function QuotationCard({ quotation }) {
  return (
    <div className="rounded border bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <div>
          <span className="font-medium">Price:</span> ${Number(quotation.price).toFixed(2)}
        </div>
        <div>
          <span className="font-medium">Delivery Time:</span> {quotation.delivery_time}
        </div>
        <div>
          <span className="font-medium">Submitted:</span>{' '}
          {new Date(quotation.created_at).toLocaleString()}
        </div>
      </div>
      {quotation.message && (
        <p className="mt-3 text-sm text-gray-700">{quotation.message}</p>
      )}
    </div>
  );
}