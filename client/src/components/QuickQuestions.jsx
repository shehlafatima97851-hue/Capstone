function QuickQuestions({ questions, onSelect }) {
  return (
    <div className="rounded-[30px] border border-slate-800/90 bg-slate-950/80 p-5 shadow-soft">
      <h3 className="mb-3 text-sm uppercase tracking-[0.24em] text-sky-300">Quick questions</h3>
      <div className="grid gap-3">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            className="rounded-3xl border border-slate-800/80 bg-slate-900 px-4 py-4 text-left text-sm text-slate-100 transition hover:border-indigo-400/70 hover:bg-slate-800"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickQuestions;
