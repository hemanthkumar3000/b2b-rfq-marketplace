export default function ErrorAlert({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <div className="flex items-start justify-between gap-3">
        <div>{message}</div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-700 transition hover:text-red-900"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}