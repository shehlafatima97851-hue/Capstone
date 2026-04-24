import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { sendChatMessage } from '../api/chatApi';

const ChatContext = createContext(null);

const defaultConversation = [
  {
    id: crypto.randomUUID(),
    title: 'Welcome to Campus Helpdesk',
    messages: [
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Hello! I am your college helpdesk assistant. Ask me about admissions, courses, fees, timetables, exams, events, or campus life.'
      }
    ],
    createdAt: Date.now()
  }
];

function createInitialState() {
  if (typeof window === 'undefined') return {
    sessions: defaultConversation,
    activeChatId: defaultConversation[0].id,
    theme: 'dark'
  };

  const stored = window.localStorage.getItem('college-helpdesk-state');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      return {
        sessions: defaultConversation,
        activeChatId: defaultConversation[0].id,
        theme: 'dark'
      };
    }
  }

  return {
    sessions: defaultConversation,
    activeChatId: defaultConversation[0].id,
    theme: 'dark'
  };
}

export function ChatProvider({ children }) {
  const [sessions, setSessions] = useState(createInitialState().sessions);
  const [activeChatId, setActiveChatId] = useState(createInitialState().activeChatId);
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [theme, setTheme] = useState(createInitialState().theme);
  const [inputValue, setInputValue] = useState('');

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeChatId) || sessions[0],
    [sessions, activeChatId]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      'college-helpdesk-state',
      JSON.stringify({ sessions, activeChatId, theme })
    );
  }, [sessions, activeChatId, theme]);

  function getSmartSuggestions(text) {
    const normalized = text.toLowerCase();
    if (!text.trim()) {
      return ['Admissions deadlines', 'Course requirements', 'Exam schedule', 'Event calendar'];
    }
    if (normalized.includes('admission')) {
      return ['Check application deadlines', 'Ask about interview tips', 'Verify entrance requirements'];
    }
    if (normalized.includes('course')) {
      return ['Explore majors available', 'Ask about elective credits', 'Request course roadmap'];
    }
    if (normalized.includes('fee') || normalized.includes('tuition')) {
      return ['Scholarship opportunities', 'Payment plans', 'Fee waiver requests'];
    }
    if (normalized.includes('exam') || normalized.includes('schedule')) {
      return ['Final exam dates', 'Study resources', 'Revaluation policy'];
    }
    return ['Campus events update', 'Counseling help', 'Library hours'];
  }

  async function sendMessage(messageText) {
    if (!messageText.trim()) return;
    setError(null);
    setIsLoading(true);

    const newMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: messageText
    };

    const updatedMessages = [...activeSession.messages, newMessage];
    const updatedSession = { ...activeSession, messages: updatedMessages };
    setSessions((prev) => prev.map((session) => (session.id === activeSession.id ? updatedSession : session)));
    setInputValue('');

    try {
      const payload = {
        role,
        messages: updatedMessages.map(({ role: msgRole, text }) => ({ role: msgRole, content: text }))
      };
      const data = await sendChatMessage(payload);
      const assistantReply = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: data.answer
      };
      setSessions((prev) =>
        prev.map((session) =>
          session.id === activeSession.id
            ? { ...session, messages: [...updatedMessages, assistantReply] }
            : session
        )
      );
    } catch (err) {
      setError(err.message || 'Server down, try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function startNewChat() {
    const newSession = {
      id: crypto.randomUUID(),
      title: 'New college assistant thread',
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'I am ready to help. Ask me anything related to college admissions, academics, or campus life.'
        }
      ],
      createdAt: Date.now()
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveChatId(newSession.id);
    setError(null);
  }

  function selectSession(sessionId) {
    setActiveChatId(sessionId);
    setError(null);
  }

  const suggestions = getSmartSuggestions(inputValue);

  return (
    <ChatContext.Provider
      value={{
        sessions,
        activeSession,
        role,
        setRole,
        isLoading,
        error,
        voiceEnabled,
        setVoiceEnabled,
        theme,
        setTheme,
        inputValue,
        setInputValue,
        sendMessage,
        startNewChat,
        selectSession,
        suggestions
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatStore() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatStore must be used within ChatProvider');
  }
  return context;
}
