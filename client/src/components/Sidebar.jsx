import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

function Sidebar({ sessions, activeId, onSelect, onNewChat }) {
  return (
    <aside className="hidden w-80 flex-col gap-4 xl:flex">
      <div className="rounded-[32px] border border-slate-800/90 bg-slate-950/90 p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">History</h2>
            <p className="text-sm text-slate-500">Tap a thread to continue a conversation.</p>
          </div>
          <button
            type="button"
            onClick={onNewChat}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-glow transition hover:scale-[1.02]"
          >
            <FaPlus />
          </button>
        </div>

        <div className="space-y-3">
          {sessions.slice(0, 6).map((session) => (
            <motion.button
              key={session.id}
              type="button"
              onClick={() => onSelect(session.id)}
              className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                session.id === activeId
                  ? 'border-sky-500/80 bg-slate-900 text-white shadow-glow'
                  : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600 hover:bg-slate-900/80'
              }`}
              whileHover={{ x: 3 }}
            >
              <p className="truncate text-sm font-medium">{session.title}</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(session.createdAt).toLocaleString()}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
