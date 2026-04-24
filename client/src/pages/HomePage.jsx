import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { FaRocketchat, FaMicrophone, FaPlus, FaMoon, FaSun } from 'react-icons/fa';
import { useChatStore } from '../hooks/useChatStore';
import ChatBubble from '../components/ChatBubble';
import QuickQuestions from '../components/QuickQuestions';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import VoiceButton from '../components/VoiceButton';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorBanner from '../components/ErrorBanner';

const quickPrompts = [
  'Tell me admission deadlines',
  'What are the top courses?',
  'Show exam timetable',
  'How much are fees?',
  'Upcoming campus events'
];

function HomePage() {
  const {
    activeSession,
    inputValue,
    setInputValue,
    sendMessage,
    startNewChat,
    sessions,
    selectSession,
    theme,
    setTheme,
    isLoading,
    error,
    role,
    setRole,
    suggestions,
    voiceEnabled,
    setVoiceEnabled
  } = useChatStore();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeSession.messages.length, isLoading]);

  const activeTitle = useMemo(() => activeSession.title || 'College Helpdesk', [activeSession.title]);

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(inputValue);
  }

  function pickPrompt(prompt) {
    setInputValue(prompt);
    sendMessage(prompt);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex h-full min-h-screen max-w-[1700px] gap-6 p-5 lg:p-8">
        <Sidebar
          sessions={sessions}
          activeId={activeSession.id}
          onSelect={selectSession}
          onNewChat={startNewChat}
        />

        <main className="flex flex-1 flex-col gap-6 rounded-[34px] border border-slate-800/80 bg-slate-900/80 p-5 shadow-soft backdrop-blur-xl lg:p-8">
          <header className="flex flex-col gap-5 rounded-3xl bg-slate-950/80 p-5 shadow-glow sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3 text-slate-300">
                <FaRocketchat className="text-sky-400" />
                <span className="text-sm uppercase tracking-[0.3em] text-sky-300">Campus helpdesk</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">College Assistant</h1>
              <p className="max-w-2xl text-sm text-slate-400">
                Ask anything about admissions, courses, fees, timetable, exams or events. Switch role for student/admin answers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="grid grid-cols-2 gap-2 rounded-3xl bg-slate-950/70 p-2 text-sm text-slate-300 shadow-inner">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`rounded-2xl px-4 py-2 transition ${role === 'student' ? 'bg-sky-500 text-white shadow-glow' : 'hover:bg-slate-800'}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`rounded-2xl px-4 py-2 transition ${role === 'admin' ? 'bg-indigo-500 text-white shadow-glow' : 'hover:bg-slate-800'}`}
                >
                  Admin
                </button>
              </div>
              <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
            </div>
          </header>

          <section className="grid gap-6 xl:grid-cols-[0.9fr_0.4fr]">
            <div className="rounded-[30px] border border-slate-800/90 bg-slate-950/90 p-5 shadow-soft">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{activeTitle}</h2>
                  <p className="text-sm text-slate-400">Conversation history is saved locally as you chat.</p>
                </div>
                <div className="rounded-3xl bg-slate-900 px-4 py-3 text-slate-300">Role: {role}</div>
              </div>

              <div ref={scrollRef} className="chat-scroll flex min-h-[420px] max-h-[640px] flex-col gap-4 overflow-y-auto pr-1 pb-2">
                {activeSession.messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                  >
                    <ChatBubble message={msg} />
                  </motion.div>
                ))}

                {isLoading && <LoadingSkeleton />}
              </div>

              {error && <ErrorBanner message={error} />}

              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-inner">
                  <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-slate-500">Ask a question</label>
                  <textarea
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    rows="2"
                    placeholder="E.g., What are the admission requirements for Computer Science?"
                    className="w-full resize-none border-0 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:w-auto">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? 'Thinking...' : 'Send request'}
                  </button>
                  <VoiceButton
                    active={voiceEnabled}
                    onToggle={() => setVoiceEnabled(!voiceEnabled)}
                    onTranscript={(transcript) => {
                      setInputValue(transcript);
                      setVoiceEnabled(false);
                      sendMessage(transcript);
                    }}
                  />
                </div>
              </form>
            </div>

            <aside className="space-y-6 rounded-[30px] border border-slate-800/90 bg-slate-950/90 p-5 shadow-soft">
              <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-300">
                <h3 className="mb-2 text-sm uppercase tracking-[0.24em] text-sky-300">Smart suggestions</h3>
                <p className="mb-4 text-sm text-slate-400">Quick prompts based on your current question.</p>
                <div className="grid gap-3">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => pickPrompt(item)}
                      className="rounded-3xl border border-slate-800/80 bg-slate-900 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-sky-500 hover:bg-slate-800"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <QuickQuestions questions={quickPrompts} onSelect={pickPrompt} />
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
