function LoadingSkeleton() {
  return (
    <div className="rounded-[32px] border border-slate-800/90 bg-slate-900/90 p-6 shadow-soft">
      <div className="mb-4 h-3 w-24 rounded-full bg-slate-800/80" />
      <div className="flex items-center gap-2">
        <span className="dot h-3 w-3 rounded-full bg-slate-400" />
        <span className="dot h-3 w-3 rounded-full bg-slate-400" />
        <span className="dot h-3 w-3 rounded-full bg-slate-400" />
      </div>
      <p className="mt-4 text-sm text-slate-500">Thinking through your college support question...</p>
    </div>
  );
}

export default LoadingSkeleton;
