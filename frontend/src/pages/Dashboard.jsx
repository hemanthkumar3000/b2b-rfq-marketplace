import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome! You are logged in as a{' '}
          <span className="font-medium text-gray-900">{user.role}</span>.
        </p>
      </div>

      {user.role === 'buyer' ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <DashboardCard
            title="Create RFQ"
            description="Post a new request for quotation."
            actionLabel="Create RFQ"
            actionHref="/rfqs/create"
            color="indigo"
          />
          <DashboardCard
            title="My RFQs"
            description="View and manage your RFQs and quotations."
            actionLabel="View My RFQs"
            actionHref="/my-rfqs"
            color="gray"
          />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <DashboardCard
            title="Browse RFQs"
            description="Search and filter open RFQs from buyers."
            actionLabel="Browse RFQs"
            actionHref="/browse-rfqs"
            color="indigo"
          />
          <DashboardCard
            title="My Quotations"
            description="View quotations you have submitted."
            actionLabel="View My Quotations"
            actionHref="/my-quotations"
            color="gray"
          />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ title, description, actionLabel, actionHref, color = 'indigo' }) {
  const baseBtn =
    'mt-4 inline-block rounded-lg px-4 py-2 text-sm font-medium text-white transition';
  const btnClass =
    color === 'indigo'
      ? `${baseBtn} bg-indigo-600 hover:bg-indigo-700`
      : `${baseBtn} bg-gray-800 hover:bg-gray-900`;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <Link to={actionHref} className={btnClass}>
        {actionLabel}
      </Link>
    </div>
  );
}