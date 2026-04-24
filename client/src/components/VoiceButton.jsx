import { useEffect, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

function VoiceButton({ onTranscript, active, onToggle }) {
  const [support, setSupport] = useState(Boolean(SpeechRecognition));
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!SpeechRecognition) {
      setSupport(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    function handleResult(event) {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');
      onTranscript(transcript);
      setRecording(false);
    }

    function handleEnd() {
      setRecording(false);
    }

    if (active) {
      recognition.start();
      setRecording(true);
      recognition.addEventListener('result', handleResult);
      recognition.addEventListener('end', handleEnd);
    }

    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('end', handleEnd);
      recognition.stop();
    };
  }, [active, onTranscript]);

  return (
    <button
      type="button"
      disabled={!support}
      onClick={onToggle}
      className="inline-flex items-center justify-center rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {recording ? <FaMicrophoneSlash className="text-rose-400" /> : <FaMicrophone className="text-sky-300" />}
      <span className="ml-2">{recording ? 'Listening...' : 'Voice input'}</span>
    </button>
  );
}

export default VoiceButton;
