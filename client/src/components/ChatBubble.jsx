import { motion } from 'framer-motion';
import { FaUserCircle, FaRobot } from 'react-icons/fa';

function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sky-400 shadow-inner">
          <FaRobot />
        </div>
      )}

      <motion.div
        className={`max-w-[82%] rounded-[32px] border px-5 py-4 text-sm leading-6 shadow-soft transition ${
          isUser
            ? 'rounded-br-[4px] bg-sky-500/15 border-sky-500/30 text-slate-100'
            : 'rounded-bl-[4px] bg-slate-900/90 border-slate-800 text-slate-200'
        }`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span>{isUser ? 'You' : 'Campus Helpdesk'}</span>
        </div>
        <p>{message.text}</p>
      </motion.div>

      {isUser && (
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sky-400 shadow-inner">
          <FaUserCircle />
        </div>
      )}
    </div>
  );
}

export default ChatBubble;
