import express from 'express';
import OpenAI from 'openai';
import { buildPrompt } from '../utils/prompt.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { messages, role } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key is not configured. Copy .env.example to .env and add your key.' });
  }

  const openai = new OpenAI({ apiKey });

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Payload must include a non-empty messages array.' });
  }

  if (messages.length > 24) {
    return res.status(400).json({ error: 'Message thread too long. Please start a new conversation.' });
  }

  if (!['student', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Role must be either student or admin.' });
  }

  try {
    const promptMessages = buildPrompt(role, messages);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: promptMessages,
      temperature: 0.25,
      max_tokens: 550
    });

    const answer = completion.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      throw new Error('No answer received from AI.');
    }

    res.json({ answer });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Unable to get a response from the AI assistant. Please try again later.' });
  }
});

export default router;
