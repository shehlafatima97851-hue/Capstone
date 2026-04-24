function ErrorBanner({ message }) {
  return (
    <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 px-4 py-4 text-sm text-rose-100 shadow-soft">
      <strong className="block font-semibold text-rose-200">Connection issue</strong>
      <p className="mt-1 text-slate-200">{message}</p>
    </div>
  );
}

export default ErrorBanner;
