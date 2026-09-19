function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
          B2B RFQ Marketplace
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Tailwind is working
        </h1>
        <p className="mt-4 text-base text-slate-600">
          The frontend is now configured with Tailwind v4 and Vite.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
        >
          Ready to build
        </button>
      </div>
    </main>
  )
}

export default App
