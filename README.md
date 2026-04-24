# College Helpdesk Chatbot

A modern AI-powered college helpdesk chatbot built with React, Tailwind CSS, Framer Motion, Node.js, and Express.

## Features

- AI-assisted chat for college questions
- Predefined quick questions
- Typing animation + loading skeleton
- Chat bubbles with user/bot styling
- Dark/light mode toggle
- Voice input support via Web Speech API
- Sidebar for new chat and history
- Animated UI with Framer Motion
- Backend OpenAI integration with prompt engineering
- Rate limiting and validation

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# Set OPENAI_API_KEY in .env
npm run dev
```

### 2. Frontend

```bash
cd ../client
npm install
npm run dev
```

### 3. Open the app

Navigate to `http://localhost:5173` and use the chatbot.

## Notes

- The backend expects `OPENAI_API_KEY` in `.env`
- No database is required for local testing. Chat history is persisted in localStorage in the browser.
- Use the voice input button to speak your question.
