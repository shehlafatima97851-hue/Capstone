import { ChatProvider } from './hooks/useChatStore';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ChatProvider>
      <HomePage />
    </ChatProvider>
  );
}

export default App;
